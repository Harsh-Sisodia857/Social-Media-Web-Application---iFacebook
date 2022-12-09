const queue = require('../config/kue');

const commentMailer = require('../mailers/comments_mailer');

queue.process('emailsQueue', function (job, done) {
    console.log('emails worker is doing its job ',job.data);
    commentMailer.newComment(job.data);
    done();
})

// To get the details of jobs, kue provide us a window
// Type ./node_module/kue/bin/kue-dashboard and open tab in crome and type localhost:3000