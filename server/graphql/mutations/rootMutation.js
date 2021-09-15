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
const User = require("../../models/userModel");

// ===== Types =====
const MessageType = require("../type/messageType");
const CompanyType = require("../type/companyType");
const JobType = require("../type/jobType");
const ApplicationType = require("../type/applicationType");
const UserType = require("../type/userType");

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    // ========== register user ==========
    register_user: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        const existedEmail = await User.findOne({ email: args.email });
        if (existedEmail) {
          throw { message: "User with this email is already existed!" };
        } else {
          let salt = await bcrypt.genSalt();
          let hashPassword = await bcrypt.hash(args.password, salt);
          let newUser = new User({
            ...args,
            interest: [],
            phone: "",
            gender: "",
            cv: "",
            password: hashPassword,
          });
          await newUser.save();

          return {
            message: "Register Sucessfull!",
          };
        }
      },
    },

    // =========== login user ===========
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args, { res }, req) => {
        try {
          const existedUser = await User.findOne({ email: args.email });

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
              name: existedUser.name,
              email: existedUser.email,
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
    edit_user: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        interest: { type: GraphQLList(GraphQLString) },
        cv: { type: GraphQLString },
        password: { type: GraphQLString },
        newpassword: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        // === find user ===
        const existedUser = await User.findById(args.id);

        if (args.password) {
          const validPassword = await bcrypt.compare(
            args.password,
            existedUser.password
          );

          if (!validPassword) {
            throw { message: "Your old password is incorrect!" };
          }
          if (!args.newpassword) {
            throw "Please input your new password!";
          }
          let salt = await bcrypt.genSalt();
          let hashPassword = await bcrypt.hash(args.newpassword, salt);

          await User.findByIdAndUpdate(args.id, {
            ...args,
            password: hashPassword,
          });
        } else {
          await User.findByIdAndUpdate(args.id, {
            ...args,
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
    // ========== user add new company ==========
    add_company: {
      type: CompanyType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        logo: { type: GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        user_position: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLID) },
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
        about: { type: GraphQLString },
        city: { type: GraphQLString },
        website: { type: GraphQLString },
        user_position: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          await Company.findByIdAndUpdate(args.id, {
            ...args,
          });
          return { message: "Edit Successful!" };
        } catch (err) {
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
    // ========== search job ==========
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
        userId: { type: GraphQLNonNull(GraphQLID) },
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
        type: { type: GraphQLList(GraphQLString) },
        requirements: { type: GraphQLList(GraphQLString) },
        descriptions: { type: GraphQLList(GraphQLString) },
        company_name: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          await Job.findByIdAndUpdate(args.id, {
            ...args,
          });
        } catch (err) {
          throw { message: "Job not found!" };
        }
        return { message: "Edit Successful!" };
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
        userId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        cv: { type: GraphQLNonNull(GraphQLString) },
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
