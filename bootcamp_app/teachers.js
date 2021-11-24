const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const args = process.argv;
let input = args.slice(2);

const cohortName = input[0] || 'JUL02';

const values = [`${cohortName}`];

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort} : ${user.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));