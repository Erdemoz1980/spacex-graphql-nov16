const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,

} = require('graphql');
const axios = require('axios');


const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    id: { type: GraphQLID },
    flickr: { type: GraphQLList(GraphQLString) },
    success: { type: GraphQLBoolean },
    details: { type: GraphQLString },
    name: { type: GraphQLString },
    date_local: { type: GraphQLString },
    crew: { type: new GraphQLList(GraphQLString) }
  })
});


const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    company: { type: GraphQLString },
    country: { type: GraphQLString },
    engines: {type:EngineType},
    description: { type: GraphQLString },
    flickr_images: { type: new GraphQLList(GraphQLString) }
    
    
  })
});


const EngineType = new GraphQLObjectType({
  name: 'Engine',
  fields: ({
    propellant_1:{type:GraphQLString},
    propellant_2:{type:GraphQLString}
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQuerytype',
  fields: {
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v4/rockets')
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    },
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v5/launches')
          .then(res = res.data)
          .catch(err => console.log(err));
      }
    },
    rocket:{
      type: RocketType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    },
    launch: {
      type: LaunchType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v5/launches/${args.id}`)
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query:RootQuery
})