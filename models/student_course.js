const { DataType } = require('sequelize');
const sequelize = require( '../config/database');

const StudentCourse = sequelize.define('StudentCourse', {});

module.exports = StudentCourse;

