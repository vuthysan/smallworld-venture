const graphql = require("graphql");
const {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
} = graphql;

// ===== Models =====
const Message = require("../../models/messageModel");
const Company = require("../../models/companyModel");
const Job = require("../../models/jobModel");
const Employer = require("../../models/employerModel");
const JobSeeker = require("../../models/jobseekerModel");

// ===== Types =====
const MessageType = require("../type/messageType");
const CompanyType = require("../type/companyType");
const JobType = require("../type/jobType");
const EmployerType = require("../type/employerType");
const JobSeekerType = require("../type/jobseekerType");

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    // === message ===
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
    // === add company ===
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
    // === edit company ===
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
    // === add job ===
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
    // === edit job ===
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
        employerId: { type: GraphQLID },
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
    // === add employer ===
    add_employer: {
      type: EmployerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        let newEm = new Employer({ ...args });
        newEm.save();
        return { message: "Sign In Successful!" };
      },
    },
    // === edit employer ===
    edit_employer: {
      type: EmployerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        gender: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          await Employer.findByIdAndUpdate(args.id, {
            ...args,
          });
          return { message: "Edit Successful!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // === add jobseeker ===
    add_jobseeker: {
      type: JobSeekerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        let newSeeker = new JobSeeker({
          gender: "",
          interest: [],
          birth_date: "",
          birth_place: "",
          cv: "",
          ...args,
        });
        await newSeeker.save();
        return newSeeker;
      },
    },
    // === edit jobseeker ===
    edit_jobseeker: {
      type: JobSeekerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
        gender: { type: GraphQLString },
        interest: { type: GraphQLList(GraphQLString) },
        birth_date: { type: GraphQLString },
        birth_place: { type: GraphQLString },
        cv: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          await JobSeeker.findByIdAndUpdate(args.id, {
            ...args,
          });
          return { message: "Edit Successful" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
  },
});

module.exports = RootMutation;
