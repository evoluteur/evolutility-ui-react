/*! 
    Evolutility-UI-React
    https://github.com/evoluteur/evolutility-ui-react
    (c) 2021 Olivier Giulieri
*/

// Data Access Object
// loads DAO for REST or DAO for GraphQL based on config option

import { apiType as zAPI } from '../config.js'
import daoREST from './dao-rest.js'
import daoGraphQL from './dao-graphql.js'

const dao = zAPI==='graphql' ? daoGraphQL : daoREST;

export const apiType = zAPI;

export default dao;
