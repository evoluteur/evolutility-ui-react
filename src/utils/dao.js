// Data Access Object

//import { apiType } from '../config.js'
import daoREST from './dao-rest.js'
//import daoGraphQL from './dao-graphql.js'

//const dao =  apiType==='graphql' ? daoGraphQL : daoREST
const dao =  daoREST

export default dao
