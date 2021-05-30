const graphql = require("graphql");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = process.env;
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
} = graphql;

// === Type Section ===
const CompanyType = require("../type/companyType");
const DepartmentType = require("../type/departmentType");
const OpportunityType = require("../type/opportunityType");
const UserType = require("../type/userType");
const MessageType = require("../type/messageType");
const ApplicationType = require("../type/applicationType");

// === Model Section ===
const Company = require("../../models/companyModel");
const Department = require("../../models/departmentModel");
const Opportunity = require("../../models/opportunityModel");
const User = require("../../models/userModel");
const Message = require("../../models/messageModel");
const Application = require("../../models/applicationModel");

const AdminMutation = new GraphQLObjectType({
  name: "AdminMutation",
  fields: {
    // ====== register user ======
    register: {
      type: UserType,
      args: {
        fullname: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const existedEmail = await User.findOne({ email: args.email });
        if (existedEmail) {
          throw new Error("Email already Exist");
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(args.password, salt);
        let newUser = new User({
          fullname: args.fullname,
          email: args.email,
          password: hashPassword,
        });
        await newUser.save();
        return { message: "Add Successful" };
      },
    },
    // ====== login =======
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const existedUser = await User.findOne({ email: args.email });
          if (!existedUser) {
            return { message: "Your password or email if incorrent!" };
          }
          const comparePassword = await bcrypt.compare(
            args.password,
            existedUser.password
          );
          if (!comparePassword) {
            return { message: "Your password or email if incorrent!" };
          } else {
            const token = jwt.sign(
              {
                email: existedUser.email,
                name: existedUser.fullname,
                id: existedUser._id,
              },
              JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );

            return {
              token,
              message: "Login Successful!",
            };
          }
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // ====== add new company ======
    add_company: {
      type: CompanyType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        logo: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const existedCom = await Company.findOne({ name: args.name });
          if (existedCom) {
            return {
              existed: true,
              message: "A company with this name is already existed!",
            };
          } else {
            const com = await new Company({ ...args });
            await com.save();
            return { existed: false, message: "Add Successful!" };
          }
        } catch (err) {
          console.log(err);
          throw error;
        }
      },
    },
    // ====== delete company ======
    delete_company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          let deletedCom = await Company.findByIdAndDelete(args.id);
          return { message: "Delete Successful!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // ===== edit company ======
    edit_company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        logo: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
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
    // ====== add new department ======
    add_department: {
      type: DepartmentType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        icon: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const dep = await new Department({ ...args });
          await dep.save();
          return { message: "Add Successful!" };
        } catch (err) {
          console.log(err);
          throw error;
        }
      },
    },
    // ====== delete department ======
    delete_department: {
      type: DepartmentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          const deletedDep = await Department.findByIdAndDelete(args.id);
          return { message: "Delete  Successful!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // ====== edit department ======
    edit_department: {
      type: DepartmentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        icon: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          await Department.findByIdAndUpdate(args.id, {
            ...args,
          });
          return { message: "Edit Successful!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // ======= add new opportunity ======
    add_opportunity: {
      type: OpportunityType,
      args: {
        position: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLBoolean) },
        requirements: {
          type: GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        responsibilities: {
          type: GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        conditions: {
          type: GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        departmentId: { type: GraphQLNonNull(GraphQLID) },
        companyName: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const opp = new Opportunity({ ...args });
          await opp.save();
          return { message: "Add Successful!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // ===== delete opportunity =====
    delete_opportunity: {
      type: OpportunityType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          await Opportunity.findByIdAndDelete(args.id);
          return { message: "Delete Successful!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // ======= edit opportunity ======
    edit_opportunity: {
      type: OpportunityType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        position: { type: GraphQLString },
        status: { type: GraphQLBoolean },
        requirements: {
          type: new GraphQLList(GraphQLString),
        },
        responsibilities: {
          type: new GraphQLList(GraphQLString),
        },
        conditions: {
          type: new GraphQLList(GraphQLString),
        },
        departmentId: { type: GraphQLID },
        companyName: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          await Opportunity.findByIdAndUpdate(args.id, {
            ...args,
          });
          return { message: "Edit Successful!" };
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // === delete message from user ===
    delete_message: {
      type: MessageType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        await Message.findByIdAndDelete(args.id);
        return { respond: "Message deleted!" };
      },
    },
    // === delete user's application ===
    delete_application: {
      type: ApplicationType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        await Application.findByIdAndDelete(args.id);
        return { message: "Application deleted!" };
      },
    },
  },
});

module.exports = AdminMutation;
