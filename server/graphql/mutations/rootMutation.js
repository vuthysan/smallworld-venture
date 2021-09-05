const graphql = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
} = graphql;

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

// ===== Models =====
const Message = require("../../models/messageModel");
const Company = require("../../models/companyModel");
const Job = require("../../models/jobModel");
const Employer = require("../../models/employerModel");
const JobSeeker = require("../../models/jobseekerModel");
const Application = require("../../models/applicationModel");

// ===== Types =====
const MessageType = require("../type/messageType");
const CompanyType = require("../type/companyType");
const JobType = require("../type/jobType");
const EmployerType = require("../type/employerType");
const JobSeekerType = require("../type/jobseekerType");
const ApplicationType = require("../type/applicationType");
const UserType = require("../type/userType");

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    // =========== register employer =============
    register_employer: {
      type: EmployerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        const existedEmail = await Employer.findOne({ email: args.email });
        if (existedEmail) {
          throw { message: "Email already existed!" };
        } else {
          let salt = await bcrypt.genSalt();
          let hashPassword = await bcrypt.hash(args.password, salt);
          let newEm = new Employer({
            ...args,
            password: hashPassword,
          });
          const savedEm = await newEm.save();

          return {
            id: savedEm.id,
            message: "Register Sucessfull!",
          };
        }
      },
    },

    // =========== register jobseeker ===========
    register_jobseeker: {
      type: JobSeekerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        const existedEmail = await JobSeeker.findOne({ email: args.email });
        if (existedEmail) {
          return { message: "Email already existed!" };
        } else {
          let salt = await bcrypt.genSalt();
          let hashPassword = await bcrypt.hash(args.password, salt);
          let newSeeker = new JobSeeker({
            interest: [],
            cv: "",
            ...args,
          });
          return {
            message: "Register Sucessfull!",
          };
        }
      },
    },
    // =========== login employer ===========
    login_employer: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, { res }, req) => {
        try {
          const existedUser = await Employer.findOne({ email: args.email });

          if (!existedUser) {
            throw { message: "User with this email not found!" };
          }
          const validPassword = await bcrypt.compare(
            args.password,
            existedUser.password
          );
          if (!validPassword) {
            throw { message: "Password is incorrect!" };
          }
          const access_token = jwt.sign(
            { id: existedUser.id, role: "employer" },

            ACCESS_SECRET,
            {
              expiresIn: "30d",
            }
          );

          const refresh_token = jwt.sign(
            {
              id: existedUser.id,
            },
            REFRESH_SECRET,
            {
              expiresIn: "30d",
            }
          );

          res.cookie("access_token", access_token, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
          });
          res.cookie("refresh_token", refresh_token, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
          });

          return {
            access_token,
            refresh_token,
            id: existedUser.id,
            message: "Success!",
          };
        } catch (err) {
          throw err;
        }
      },
    },
    // =========== login jobseeker ===========
    login_jobseeker: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, { res }) => {
        try {
          const existedUser = await JobSeeker.findOne({ email: args.email });

          if (!existedUser) {
            throw { message: "User with this email not found!" };
          }
          const validPassword = await bcrypt.compare(
            args.password,
            existedUser.password
          );
          if (!validPassword) {
            throw { message: "Password is incorrect!" };
          }
          const access_token = jwt.sign(
            {
              id: existedUser.id,
              role: "jobseeker",
            },
            ACCESS_SECRET,
            {
              expiresIn: "30d",
            }
          );
          const refresh_token = jwt.sign(
            {
              id: existedUser.id,
            },
            REFRESH_SECRET,
            {
              expiresIn: "30d",
            }
          );
          res.cookie("access_token", access_token, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
          });
          res.cookie("refresh_token", refresh_token, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
          });
          return {
            access_token,
            refresh_token,
            id: existedUser.id,
            message: "Success!",
          };
        } catch (err) {
          throw err;
        }
      },
    },
    // ========== logout ==========
    logout: {
      type: UserType,
      resolve: (_, __, { res }) => {
        try {
          res.cookie("access_token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: "none",
          });
          res.cookie("refresh_token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: "none",
          });
        } catch {}
        return {
          message: "Logged Out!",
        };
      },
    },
    // ========== edit employer ==========
    edit_employer: {
      type: EmployerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        newpassword: { type: GraphQLString },
        gender: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const existedUser = await Employer.findById(args.id);

        if (args.password) {
          const validPassword = await bcrypt.compare(
            args.password,
            existedUser.password
          );

          if (!validPassword) {
            throw { message: "Your old password is incorrect!" };
          }

          let salt = await bcrypt.genSalt();
          let hashPassword = await bcrypt.hash(args.newpassword, salt);

          await Employer.findByIdAndUpdate(args.id, {
            ...args,
            password: hashPassword,
          });
        } else {
          await Employer.findByIdAndUpdate(args.id, {
            ...args,
            password: existedUser.password,
          });
        }

        return {
          message: "Done",
        };
      },
    },
    // ========== edit jobseeker ==========
    edit_jobseeker: {
      type: JobSeekerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        gender: { type: GraphQLString },
        interest: { type: GraphQLList(GraphQLString) },
        cv: { type: GraphQLString },
        password: { type: GraphQLString },
        newpassword: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        // === check for existing jobseeker ===
        const existedUser = await JobSeeker.findById(args.id);

        if (args.password) {
          const validPassword = await bcrypt.compare(
            args.password,
            existedUser.password
          );

          if (!validPassword) {
            throw { message: "Your old password is incorrect!" };
          }

          let salt = await bcrypt.genSalt();
          let hashPassword = await bcrypt.hash(args.newpassword, salt);

          await JobSeeker.findByIdAndUpdate(args.id, {
            ...args,
            password: hashPassword,
          });
        } else {
          await JobSeeker.findByIdAndUpdate(args.id, {
            ...args,
            password: existedUser.password,
          });
        }

        return {
          message: "Done",
        };
      },
    },
    // ========== smallworld message ============
    post_message: {
      type: MessageType,
      args: {
        fullname: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        message: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        let newMessage = new Message({ ...args });
        await newMessage.save();
        return { respond: "Message sent!" };
      },
    },
    // ========== employer add new company ==========
    add_company: {
      type: CompanyType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        employer_position: { type: GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLNonNull(GraphQLString) },
        logo: { type: GraphQLNonNull(GraphQLString) },
        employerId: { type: GraphQLNonNull(GraphQLID) },
        website: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        let newCom = new Company({ ...args });
        await newCom.save();
        return { message: "Company Added!" };
      },
    },
    // ========== edit company ==========
    edit_company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        logo: { type: GraphQLString },
        website: { type: GraphQLString },
        city: { type: GraphQLString },
        about: { type: GraphQLString },
        employer_position: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          await Company.findByIdAndUpdate(args.id, {
            ...args,
          });
          return { message: "Edit Successful!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // ============ delete company (and jobs of company) =========
    delete_company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          // === delete company ===
          await Company.findByIdAndRemove(args.id);

          // ====== find jobs by company's nam ======
          try {
            //  == regex use to prevent case sensitive ===
            let jobs = await Job.find({
              company_name: {
                $regex: new RegExp(args.name, "i"),
              },
            });
            // === remove jobs related to company ===
            await jobs.forEach(async (res) => {
              // console.log(res.id )
              await Job.findByIdAndRemove(res.id);
            });
          } catch {}

          return { message: "Done" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    search: {
      type: new GraphQLList(JobType),
      args: {
        search: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { search } = args;
        const regex = new RegExp(search, "gi");

        return search === ""
          ? Job.find().sort({ createdAt: -1 })
          : Job.find({ position: regex }).sort({ createdAt: -1 });
      },
    },
    // ========== employer add job ==========
    add_job: {
      type: JobType,
      args: {
        position: { type: GraphQLNonNull(GraphQLString) },
        salary: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLList(GraphQLString) },
        requirements: { type: GraphQLList(GraphQLString) },
        descriptions: { type: GraphQLList(GraphQLString) },
        company_name: { type: GraphQLNonNull(GraphQLString) },
        employerId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        let newJob = new Job({ ...args });
        newJob.save();
        return { message: "Job Added!" };
      },
    },
    // ========== edit job ==========
    edit_job: {
      type: JobType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        position: { type: GraphQLString },
        salary: { type: GraphQLString },
        company_name: { type: GraphQLString },
        employerId: { type: GraphQLID },
        type: { type: GraphQLList(GraphQLString) },
        requirements: { type: GraphQLList(GraphQLString) },
        descriptions: { type: GraphQLList(GraphQLString) },
      },
      resolve: async (_, args) => {
        try {
          await Job.findByIdAndUpdate(args.id, {
            ...args,
          });
          return { message: "Edit Successful!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    delete_job: {
      type: JobType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args) => {
        try {
          await Job.findByIdAndRemove(args.id);
          return { message: "Deleted!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },

    // === job seeker apply for job (post appilication)===
    post_application: {
      type: ApplicationType,
      args: {
        jobId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        cv: { type: GraphQLNonNull(GraphQLString) },
        jobseekerId: { type: GraphQLNonNull(GraphQLID) },
        additional: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        let newApp = new Application({ ...args });
        await newApp.save();
        return { message: "Apply Succesfull" };
      },
    },

    delete_application: {
      type: ApplicationType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args) => {
        await Application.findByIdAndRemove(args.id);
        return {
          message: "Deleted",
        };
      },
    },
  },
});

module.exports = RootMutation;
