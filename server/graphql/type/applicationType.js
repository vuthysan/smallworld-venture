const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

// === Type ===
const JobSeekerType = require("./jobseekerType");
const JobType = require("./jobType");

// === Model ===
const JobSeeker = require("../../models/jobseekerModel");
const Job = require("../../models/jobModel");

const ApplicantionType = new GraphQLObjectType({
  name: "Accplication",
  fields: () => ({
    id: { type: GraphQLID },
    jobId: { type: GraphQLID },
    createdAt: { type: GraphQLID },
    additional: { type: GraphQLString },
    // ==== job seeker ====
    // jobseekerId: { type: GraphQLID },
    message: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    phone: { type: GraphQLString },
    cv: { type: GraphQLString },
    // === job info of this application ===
    job: {
      type: JobType,
      resolve: async (parent) => {
        let job = await Job.findById(parent.jobId);
        return job;
      },
    },
    // === job seeker of this application ===
    // jobseeker: {
    //   type: JobSeekerType,
    //   resolve: async (parent) => {
    //     let seekers = await JobSeeker.findById(parent.jobseekerId);
    //     return seekers;
    //   },
    // },
  }),
});

module.exports = ApplicantionType;
