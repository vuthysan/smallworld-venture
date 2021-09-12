const graphql = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { REFRESH_SECRET, ACCESS_SECRET } = process.env;
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

// ====== Model ======
const Company = require("../../models/companyModel");
const Job = require("../../models/jobModel");
const Employer = require("../../models/employerModel");
const JobSeeker = require("../../models/jobseekerModel");
const Application = require("../../models/applicationModel");
const User = require("../../models/userModel");

// ====== Type ======
const CompanyType = require("../type/companyType");
const JobType = require("../type/jobType");
const EmployerType = require("../type/employerType");
const JobSeekerType = require("../type/jobseekerType");
const ApplicationType = require("../type/applicationType");
const UserType = require("../type/userType");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // === get all companies ===
    get_companies: {
      type: new GraphQLList(CompanyType),
      description: "List of companies",
      resolve: async () => {
        const com = await Company.find().sort({ createdAt: -1 });
        return com;
      },
    },
    // === get company by company's name ===
    get_company: {
      type: CompanyType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        //  == regex use to prevent case sensitive ===
        let com = await Company.findOne({
          name: {
            $regex: new RegExp(args.name, "i"),
          },
        });
        return com;
      },
    },
    // === get company by company's id ===
    get_company_by_id: {
      type: CompanyType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        let com = await Company.findById(args.id);
        return com;
      },
    },
    // === get all jobs ===
    get_jobs: {
      type: new GraphQLList(JobType),
      description: "List of jobs",
      resolve: async () => {
        const job = await Job.find().sort({ createdAt: -1 });
        return job;
      },
    },
    // === get job by id ===
    get_job: {
      type: JobType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        const job = await Job.findById(args.id).sort({ createdAt: -1 });
        return job;
      },
    },

    // === get all users ===
    get_users: {
      type: new GraphQLList(UserType),
      description: "List of users",
      resolve: async () => {
        const users = await User.find().sort({ createdAt: -1 });
        return users;
      },
    },
    get_user: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        const user = await User.findById(args.id);
        return user;
      },
    },
    // === get employer by id ===
    get_employer: {
      type: EmployerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        const em = await Employer.findById(args.id);
        return em;
      },
    },

    // === get job seeker by id ===
    get_jobseeker: {
      type: JobSeekerType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args) => {
        let seeker = await JobSeeker.findById(args.id);
        return seeker;
      },
    },
    // === get jobseeker applications by jobseeker id ===
    get_user_applications: {
      type: GraphQLList(ApplicationType),
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        let apps = await Application.find({
          jobseekerId: args.jobseekerId,
        });
        return apps;
      },
    },
  },
});

module.exports = RootQuery;
