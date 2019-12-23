var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var moment = require('moment');
var sendMail = require('node-email-sender');
var emailConfig = {
    emailFrom: 'invest.projects.invest@yandex.kz',
    transporterConfig: {
        service: 'yandex',
        auth: {
            user: 'invest.projects.invest@yandex.kz',
            pass: 'C9973DA951AE6202C9B348379A1BE49D'
        }
    }
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');  //Custom
var bluebird = require('bluebird');
var config = require('./config');

var app = express();

// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);


//Database connection --
var mongoose = require('mongoose')
mongoose.Promise = bluebird

mongoose.connect(config.DATABASE, {useNewUrlParser: true})
        .then(() => {
            console.log(`Succesfully Connected to the Mongodb Database..`)
        })
        .catch(() => {
            console.log(`Error Connecting to the Mongodb Database...`)
        })
       // catch 404 and forward to error handler 
app.use(function (req, res, next) {
    var id = req.query.id;
    var user = req.body.user;

    console.log('user = '+user)
    console.log('id='+id)

    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

var Project = mongoose.model('Projects')
var User = mongoose.model('Users')
var j = schedule.scheduleJob('0 0 0 * * *', function(){
    Project.find(function(error, projects){
        if(error)
            console.log('error = ' + error)
        else {
            var today = moment()
            for(let i=0; i<projects.length; i++){
                var manager = User.find({manager: project.manager})
                var investor = User.findById(project.investor)

                var project = projects[i]

                //Проверка статус Принято 1-этап = закончился
                if(project.status == 'Принято'){
                    var sms = "Вы прошли первый этап проекта, для прохождения на второй этап заполните данные по Заявке №"+project._id
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Статус анкеты по Заявке №'+project._id,
                        content: sms,
                    });
                }

                //Проверка срока редактирования анкеты
                var end_anketaSrok = moment(project.anketaSrok)
                var days_anketaSrok = Math.ceil(end_anketaSrok.diff(today, 'days', true))
                if(days_anketaSrok <= 0){
                    var sms = "Вы просрочили срок изменения анкеты по Заявке №"+project._id
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок анкеты по Заявке №'+project._id,
                        content: sms,
                    });
                }

                //Проверка сроков по файлам
                var end_financialReport1_srok = moment(project.financialReport1_srok)
                var end_financialReport2_srok = moment(project.financialReport2_srok)
                var end_financialReport3_srok = moment(project.financialReport3_srok)
                var end_descriptionNote1_srok = moment(project.descriptionNote1_srok)
                var end_descriptionNote2_srok = moment(project.descriptionNote2_srok)
                var end_descriptionNote3_srok = moment(project.descriptionNote3_srok)
                var end_garantyLetter_srok = moment(project.garantyLetter_srok)
                var end_landSchema_srok = moment(project.landSchema_srok)
                var end_projectConcept_srok = moment(project.projectConcept_srok)
                var end_foreskiz_srok = moment(project.foreskiz_srok)

                var days_financialReport1_srok = Math.ceil(end_financialReport1_srok.diff(today, 'days', true))
                var days_financialReport2_srok = Math.ceil(end_financialReport2_srok.diff(today, 'days', true))
                var days_financialReport3_srok = Math.ceil(end_financialReport3_srok.diff(today, 'days', true))
                var days_descriptionNote1_srok = Math.ceil(end_descriptionNote1_srok.diff(today, 'days', true))
                var days_descriptionNote2_srok = Math.ceil(end_descriptionNote2_srok.diff(today, 'days', true))
                var days_descriptionNote3_srok = Math.ceil(end_descriptionNote3_srok.diff(today, 'days', true))
                var days_garantyLetter_srok = Math.ceil(end_garantyLetter_srok.diff(today, 'days', true))
                var days_landSchema_srok = Math.ceil(end_landSchema_srok.diff(today, 'days', true))
                var days_projectConcept_srok = Math.ceil(end_projectConcept_srok.diff(today, 'days', true))
                var days_foreskiz_srok = Math.ceil(end_foreskiz_srok.diff(today, 'days', true))

                if(days_financialReport1_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Финансовая отчетность №1 по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                if(days_financialReport2_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Финансовая отчетность №2 по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                if(days_financialReport3_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Финансовая отчетность №3 по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                if(days_descriptionNote1_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Пояснительная записка №1 по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                if(days_descriptionNote2_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Пояснительная записка №2 по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                if(days_descriptionNote3_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Пояснительная записка №3 по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                if(days_garantyLetter_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Гарантийное письмо по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                if(days_landSchema_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Схема земельного участка по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                if(days_projectConcept_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Концепция проекта по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                if(days_foreskiz_srok <= 0){
                    var sms = "Вы просрочили срок замены файла Форэскиз по Первому этапу"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок файла по Заявке №'+project._id,
                        content: sms,
                    });
                }
                //Проверяет сроки по стадиям
                var endMain = moment(project.dates.end)
                var days = Math.ceil(endMain.diff(today, 'days', true))
                console.log('project = ' + project.name + 'days difference = ' + days)
                console.log('endMain = ' + project.dates.end)
                console.log('today = ' + today.format('YYYY-MM-DD'))
                if(days == 7){
                    var sms7 = "До завершения стадии «"+project.name+"» осталось 1 неделя"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms7,
                        role: 'manager'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms7+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: manager.email,
                        subject: 'Срок по Заявке №'+project._id,
                        content: sms7,
                    });
                } else if(days == 3){
                    var sms3 = "До завершения стадии «"+project.name+"» осталось 3 дня"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms3,
                        role: 'manager'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms3+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: manager.email,
                        subject: 'Срок по Заявке №'+project._id,
                        content: sms3,
                    });
                } else if(days == 1){
                    var sms1 = "До завершения стадии «"+project.name+"» осталось 1 день"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms1,
                        role: 'manager'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms1+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: manager.email,
                        subject: 'Срок по Заявке №'+project._id,
                        content: sms1,
                    });
                } else if(days == 0){
                    var sms0 = "Стадия «"+project.name+"» завершилась"
                    var newNotification = new Notification({
                        projectID: project._id,
                        projectName: project.name,
                        projectOrganisation: project.organisation,
                        text: sms0,
                        role: 'investor'
                    })
                    newNotification.save(function(error2, doc){
                        if(error2)
                            console.log('Error:'+sms0+' '+error2)
                    })
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Срок по Заявке №'+project._id,
                        content: sms0,
                    });
                }

                for(let j=0; j<project.steps.length; j++){
                    var step = project.steps[j]
                    var endMain = moment(step.dates.end)
                    var days = Math.ceil(endMain.diff(today, 'days', true))
                    console.log('project = ' + step.name + 'days difference = ' + days)
                    console.log('endMain = ' + step.dates.end)
                    console.log('today = ' + today.format('YYYY-MM-DD'))
                    if(days == 7){
                        var sms7 = "До завершения стадии «"+step.name+"» осталось 1 неделя"
                        var newNotification = new Notification({
                            projectID: project._id,
                            projectName: project.name,
                            projectOrganisation: project.organisation,
                            text: sms7,
                            role: 'manager'
                        })
                        newNotification.save(function(error2, doc){
                            if(error2)
                                console.log('Error:'+sms7+' '+error2)
                        })
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: manager.email,
                            subject: 'Срок по Заявке №'+project._id,
                            content: sms7,
                        });
                    } else if(days == 3){
                        var sms3 = "До завершения стадии «"+step.name+"» осталось 3 дня"
                        var newNotification = new Notification({
                            projectID: project._id,
                            projectName: project.name,
                            projectOrganisation: project.organisation,
                            text: sms3,
                            role: 'manager'
                        })
                        newNotification.save(function(error2, doc){
                            if(error2)
                                console.log('Error:'+sms3+' '+error2)
                        })
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: manager.email,
                            subject: 'Срок по Заявке №'+project._id,
                            content: sms3,
                        });
                    } else if(days == 1){
                        var sms1 = "До завершения стадии «"+step.name+"» осталось 1 день"
                        var newNotification = new Notification({
                            projectID: project._id,
                            projectName: project.name,
                            projectOrganisation: project.organisation,
                            text: sms1,
                            role: 'manager'
                        })
                        newNotification.save(function(error2, doc){
                            if(error2)
                                console.log('Error:'+sms1+' '+error2)
                        })
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: manager.email,
                            subject: 'Срок по Заявке №'+project._id,
                            content: sms1,
                        });
                    } else if(days == 0){
                        var sms0 = "Стадия «"+step.name+"» завершилась"
                        var newNotification = new Notification({
                            projectID: project._id,
                            projectName: project.name,
                            projectOrganisation: project.organisation,
                            text: sms0,
                            role: 'investor'
                        })
                        newNotification.save(function(error2, doc){
                            if(error2)
                                console.log('Error:'+sms0+' '+error2)
                        })
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: 'Срок по Заявке №'+project._id,
                            content: sms0,
                        });
                    }
                }
            }
        }
    })
});