var Project = require('../models/project.model');
var User = require('../models/user.model');
var Manager = require('../models/manager.model');
var Notification = require('../models/notification.model');
var mongoose = require('mongoose');
var _ = require('lodash')
var moment = require('moment')

var randomize = require('randomatic');

var Log = require('../models/log.model');

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
exports.createProject = async function (id, project) {
    // Creating a new Mongoose Object by using the new keyword
    var newProject = new Project({
        name: project.name,
        category: project.category,//Category,
        bin: project.bin,
        organisation: project.organisation,
        address: project.address,
        phone: project.phone,
        email: project.email,
        web: project.web,
        registration: project.registration,
        fioDirector: project.fioDirector,
        project_role: project.project_role,//ProjectRole,
        personalCount: project.personalCount,
        financialReport1: project.financialReport1,//file
        financialReport2: project.financialReport2,//file
        financialReport3: project.financialReport3,//file
        descriptionNote1: project.descriptionNote1,//file
        descriptionNote2: project.descriptionNote2,//file
        descriptionNote3: project.descriptionNote3,//file
        garantyLetter: project.garantyLetter,//file
        ProjectDescription: project.ProjectDescription,
        ProjectAim: project.ProjectAim,
        ProjectInnovation: project.ProjectInnovation,
        ProjectUniqueness: project.ProjectUniqueness,
        ProjectApplication: project.ProjectApplication,
        ProjectPerspective: project.ProjectPerspective,
        companyInfo: project.companyInfo,
        ProjectLeaderDescription: project.ProjectLeaderDescription,
        participationOfParties: project.participationOfParties,
        Innovations: project.Innovations,

        landSpkAstana: Number(project.landSpkAstana),
        landInitiator: Number(project.landInitiator),
        landInvested: Number(project.landInvested),
        landTotal: Number(project.landTotal), //landSpkAstana + landInitiator + landInvested
        buildingSpkAstana: Number(project.buildingSpkAstana),
        buildingInitiator: Number(project.buildingInitiator),
        buildingInvested: Number(project.buildingInvested),
        buildingTotal: Number(project.buildingTotal), //buildingSpkAstana + buildingInitiator + buildingInvested
        technicaSpkAstana: Number(project.technicaSpkAstana),
        technicaInitiator: Number(project.technicaInitiator),
        technicaInvested: Number(project.technicaInvested),
        technicaTotal: Number(project.technicaTotal), //technicaSpkAstana + technicaInitiator + technicaInvested
        oborotSpkAstana: Number(project.oborotSpkAstana),
        oborotInitiator: Number(project.oborotInitiator),
        oborotInvested: Number(project.oborotInvested),
        oborotTotal: Number(project.oborotTotal), //oborotSpkAstana + oborotInitiator + oborotInvested
        otherSpkAstana: Number(project.otherSpkAstana),
        otherInitiator: Number(project.otherInitiator),
        otherInvested: Number(project.otherInvested),
        otherTotal: Number(project.otherTotal), //otherSpkAstana + otherInitiator + otherInvested
        itogoSpkAstana: Number(project.itogoSpkAstana),
        itogoInitiator: Number(project.itogoInitiator),
        itogoInvested: Number(project.itogoInvested),
        itogoTotal: Number(project.itogoTotal), //itogoSpkAstana + itogoInitiator + itogoInvested
        dolyaSpkAstana: project.dolyaSpkAstana,
        dolyaInitiator: project.dolyaInitiator,
        dolyaInvested: project.dolyaInvested,
        dolyaTotal: project.dolyaTotal, //dolyaSpkAstana + dolyaInitiator + dolyaInvested

        valovayaVyruchka: Number(project.valovayaVyruchka),//tenge
        valovoyProduction: Number(project.valovoyProduction),//edinica
        rashodyProduction: Number(project.rashodyProduction),//tenge
        operationalProfit: Number(project.operationalProfit),
        pogashenieObyazatelstv: Number(project.pogashenieObyazatelstv),
        otherRashody: Number(project.otherRashody),
        taxes: Number(project.taxes),
        profit: Number(project.profit),
        totalPeriod: Number(project.totalPeriod), //years

        valovayaVyruchkaYear: Number(project.valovayaVyruchkaYear),//tenge
        valovoyProductionYear: Number(project.valovoyProductionYear),//edinica
        rashodyProductionYear: Number(project.rashodyProductionYear),//tenge
        operationalProfitYear: Number(project.operationalProfitYear),
        pogashenieObyazatelstvYear: Number(project.pogashenieObyazatelstvYear),
        otherRashodyYear: Number(project.otherRashodyYear),
        taxesYear: Number(project.taxesYear),
        profitYear: Number(project.profitYear),
        valovayaVyruchkaPeriod: Number(project.valovayaVyruchkaPeriod),//tenge
        valovoyProductionPeriod: Number(project.valovoyProductionPeriod),//edinica
        rashodyProductionPeriod: Number(project.rashodyProductionPeriod),//tenge
        operationalProfitPeriod: Number(project.operationalProfitPeriod),
        pogashenieObyazatelstvPeriod: Number(project.pogashenieObyazatelstvPeriod),
        otherRashodyPeriod: Number(project.otherRashodyPeriod),
        taxesPeriod: Number(project.taxesPeriod),
        profitPeriod: Number(project.profitPeriod),

        notes: project.notes,
        landRequested: project.landRequested, //га
        landRequestedAddress: project.landRequestedAddress,
        placementRequest: project.placementRequest,
        landSchema: project.landSchema, //file
        projectConcept: project.projectConcept, //file
        foreskiz: project.foreskiz, //file
        manager: project.manager,//Manager,
        investor: id,//User

        projectEtap: 1,
        dates: {
            start: "",//Дата регистрации: @дата принятия менеджером анкеты
            end: ""//Дата окончания: @когда закончился весь второй этап
          },
        status: 'Не принято',
        editManager: true,

        investSumStatus: [{"id":'Принято',"name":'Принято'}],
        NPVstatus: [{"id":'Принято',"name":'Принято'}],
        IRRstatus: [{"id":'Принято',"name":'Принято'}],
        srokOkupaemostStatus: [{"id":'Принято',"name":'Принято'}],
        summaOneMeterStatus: [{"id":'Принято',"name":'Принято'}],
        rentabelnostStatus: [{"id":'Принято',"name":'Принято'}],
        finansPrivateStatus: [{"id":'Принято',"name":'Принято'}],
        finansBorrowedStatus: [{"id":'Принято',"name":'Принято'}],
        finansForeignStatus: [{"id":'Принято',"name":'Принято'}],
        finansStateStatus: [{"id":'Принято',"name":'Принято'}],

        financialReport1_status: project.financialReport1_status,
        financialReport2_status: project.financialReport2_status,
        financialReport3_status: project.financialReport3_status,
        descriptionNote1_status: project.descriptionNote1_status,
        descriptionNote2_status: project.descriptionNote2_status,
        descriptionNote3_status: project.descriptionNote3_status,
        garantyLetter_status: project.garantyLetter_status,
        landSchema_status: project.landSchema_status,
        projectConcept_status: project.projectConcept_status,
        foreskiz_status: project.foreskiz_status,

        landSchema_date: project.landSchema_date, //file
        projectConcept_date: project.projectConcept_date, //file
        foreskiz_date: project.foreskiz_date, //file    
        financialReport1_date: project.financialReport1_date,//file
        financialReport2_date: project.financialReport2_date,//file
        financialReport3_date: project.financialReport3_date,//file
        descriptionNote1_date: project.descriptionNote1_date,//file
        descriptionNote2_date: project.descriptionNote2_date,//file
        descriptionNote3_date: project.descriptionNote3_date,//file
        garantyLetter_date: project.garantyLetter_date//file
                
        /*grafikInvest: [
            {name: 2019, summa: null, status: null, srok: null},
            {name: 2020, summa: null, status: null, srok: null},
            {name: 2021, summa: null, status: null, srok: null},
            {name: 2022, summa: null, status: null, srok: null}
        ]*/
    })

    try {
        // Saving the Project 
        var savedProject = await newProject.save();
        if(savedProject){
            var log = new Log({
                user: id,
                object: savedProject._id,
                newValue: JSON.stringify(savedProject),
                action: 'Project object is created'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                }
            });

            var sms = "Заявка на участие в инвестиционном проекте «"+savedProject.name+"» совместно с ТОО «"+savedProject.organisation+"» успешно зарегистрирована под №"+savedProject._id
            var smsIn = "Ваша заявка на участие в инвестиционном проекте «"+savedProject.name+"» совместно с ТОО «"+savedProject.organisation+"» успешно зарегистрирована под №"+savedProject._id
            var newNotification = new Notification({
                projectID: savedProject._id,
                projectName: savedProject.name,
                projectOrganisation: savedProject.organisation,
                text: sms,
                role: 'manager'
            })
            newNotification.save(function(error, doc){
                if(error){
                    throw Error(error)
                } else {
                    var manager = User.findOne({manager:savedProject.manager})
                    var response = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: manager.email,
                        subject: 'Заявка №'+savedProject._id+' сформировалась',
                        content: sms,
                    });
                     
                    var investor = User.findOne({_id:savedProject.investor})
                    var response2 = sendMail.sendMail({
                        emailConfig: emailConfig,
                        to: investor.email,
                        subject: 'Заявка №'+savedProject._id+' сформировалась',
                        content: smsIn,
                    });

                    var newDoc = new Notification({
                        projectID: savedProject._id,
                        projectName: savedProject.name,
                        projectOrganisation: savedProject.organisation,
                        text: smsIn,
                        role: 'investor'
                    })
                    newDoc.save(function(e, d){
                        if(e){
                            throw Error(e)
                        } else {
                            return savedProject;
                        }
                    })
                }
            })
        }
    } catch (e) {
        console.log(e)
        // return a Error message describing the reason     
        throw Error(e)
    }
}

exports.updateProject = async function (id, project, filter, userId) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the Project 
        var _updateProject = await Project.findOne({ _id: id });
        var old = _updateProject
        _updateProject = _.extend(_updateProject , project);
        //_updateProject.dates.start = project.dates.start;
        //_updateProject.dates.end = project.dates.end;
        //_updateProject.expanded = project.expanded;
        if(filter.codeLawyer){
            _updateProject.codeEnteredLawyer = randomize('*', 5)
        }
        if(filter.codeFinancier){
            _updateProject.codeEnteredFinancier = randomize('*', 5)
        }

        var final = await _updateProject.save();
        if(final){
            var log = new Log({
                user: userId,
                object: final._id,
                newValue: JSON.stringify(final),
                oldValue: JSON.stringify(old),
                action: 'Project object is updated'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                }
            });

            var manager = await User.findOne({manager:final.manager})             
            var investor = await User.findOne({_id: final.investor})
            var managerMan = await Manager.findOne({_id: final.manager})

            var lawyer = await User.findOne({lawyer:final.lawyer})
            var financier = await User.findOne({financier:final.financier})

            if(final.investSumStatus[0]=='Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял Сумму инвестиции"
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            if(final.NPVstatus[0] == 'Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял NPV"
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            if(final.IRRstatus[0] == 'Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял IRR"
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            if(final.srokOkupaemostStatus[0] == 'Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял Срок окупаемости"
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            if(final.summaOneMeterStatus[0] == 'Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял Сумма за 1 кв. м."
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            if(final.rentabelnostStatus[0] == 'Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял Рентабельность"
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            if(final.finansPrivateStatus[0] == 'Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял Собственные"
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            if(final.finansBorrowedStatus[0] == 'Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял Заемные"
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            if(final.finansForeignStatus[0] == 'Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял Иностранные"
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            if(final.finansStateStatus[0] == 'Не принято'){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял Государственные программы (бюджетные средства)"
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: '2-этап Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            }
            for(let i=0; i<final.grafikInvest.length; i++){
                if(final.grafikInvest[i].status[0] == 'Не принято')
                {
                    var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") не принял График освоения "+final.grafikInvest[i].name
                    var newDoc = new Notification({
                        projectID: final._id,
                        projectName: final.name,
                        projectOrganisation: final.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newDoc.save(function(e, d){
                        if(e){
                            throw Error(e)
                        } else {
                            var response = sendMail.sendMail({
                                emailConfig: emailConfig,
                                to: investor.email,
                                subject: '2-этап Заявка №'+final._id,
                                content: sms,
                            });
                            return final;
                        }
                    })
                }
            }
            if(filter.docName){
                var sms = "«"+final.organisation+"» загрузил "+filter.docName+" датой "+moment().format('YYYY-MM-DD')
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'manager'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: manager.email,
                            subject: 'Загружен файл Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            } 
            if(filter.anketaManagerNotify){
                var sms = "«"+final.organisation+"» изменил "+filter.anketaManagerNotify
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'manager'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: manager.email,
                            subject: 'Анкета изменилась Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            } 
            if(filter.anketaSendInvestorNotify) {
                var sms = "Ваша заявка под №"+final._id+" возвращена на доработку. Замечания от менеджера:"+final.anketaComments[final.anketaComments.length-1]
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: 'Доработать Заявку №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            } 
            if(filter.anketaSendInvestorNotify2) {
                var sms = "Ваша заявка под №"+final._id+" возвращена на доработку. Замечания от менеджера:"+final.anketaComments2[final.anketaComments2.length-1]
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: 'Доработать Заявку №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            } 
            if(filter.anketaAcceptNotify){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") принял анкету заявки "+moment().format('YYYY-MM-DD')
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: 'Анкета принята Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            } 
            if(filter.anketaAcceptNotify2){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") принял данные 2-этапа заявки "+moment().format('YYYY-MM-DD')
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: 'Данные 2-этапа принята Заявка №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            } 
            if(filter.secondEtapManager){
                var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") изменил "+filter.secondEtapManager
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'investor'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: investor.email,
                            subject: 'Изменен 2-этап Заявки №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            } 
            if(filter.secondEtapInvestor){
                var sms = "«"+final.organisation+"» изменил "+filter.secondEtapInvestor
                var newDoc = new Notification({
                    projectID: final._id,
                    projectName: final.name,
                    projectOrganisation: final.organisation,
                    text: sms,
                    role: 'manager'
                })
                newDoc.save(function(e, d){
                    if(e){
                        throw Error(e)
                    } else {
                        var response = sendMail.sendMail({
                            emailConfig: emailConfig,
                            to: manager.email,
                            subject: 'Изменен 2-этап Заявки №'+final._id,
                            content: sms,
                        });
                        return final;
                    }
                })
            } 
            if(filter.gant){
                if(filter.gant.name){
                    var sms = "Менеджер "+managerMan.fio+", (контакты: "+managerMan.phone+") внес изменения в стадию "+filter.gant.name+" в поле "
                    if(filter.gant.comment)
                        sms += "комментарий "
                    if(filter.gant.file)
                        sms += "файл "
                    if(filter.gant.start)
                        sms += "Дата начала "
                    if(filter.gant.end)
                        sms += "Дата окончания "
                    var newDoc = new Notification({
                        projectID: final._id,
                        projectName: final.name,
                        projectOrganisation: final.organisation,
                        text: sms,
                        role: 'investor'
                    })
                    newDoc.save(function(e, d){
                        if(e){
                            throw Error(e)
                        } else {
                            var response = sendMail.sendMail({
                                emailConfig: emailConfig,
                                to: investor.email,
                                subject: 'Поменяли стадию в Заявке №'+final._id,
                                content: sms,
                            });
                            return final;
                        }
                    })
                } else {
                    return final
                }
            }
            if(filter.codeFinancier){
                var response = sendMail.sendMail({
                    emailConfig: emailConfig,
                    to: financier.email,
                    subject: 'Отправлен код для Финансиста по Заявке №'+final._id,
                    content: 'Код для подтверждения: '+final.codeEnteredFinancier,
                });
                return final;
            }
            if(filter.codeLawyer){
                var response = sendMail.sendMail({
                    emailConfig: emailConfig,
                    to: lawyer.email,
                    subject: 'Отправлен код для Юриста по Заявке №'+final._id,
                    content: 'Код для подтверждения: '+final.codeEnteredLawyer,
                });
                return final;
            }
            return final;
        }
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}

// Async function to get the User List
exports.getProjects = async function (role, id) {
    // Options setup for the mongoose paginate
    /*var options = {
        page,
        limit
    }*/
    // Try Catch the awaited promise to handle the error 
    var filter = {}
    try {
        if(role){
            if(role == 'manager' || role =='lawyer' || role =='financier'){
                var user = await User.findById(id)
                if(user.role == 'manager'){
                    id = user.manager
                    filter.manager = id
                } else if (user.role == 'lawyer'){
                    id = user.lawyer
                    filter.lawyer = id
                } else if(user.role == 'financier'){
                    id = user.financier
                    filter.financier = id
                }
            } else
                filter.investor = id
        }
        var Projects = await Project.find(filter)
        if(Projects){
            var listIds = []
            for(let i=0; i<Projects.length; i++){
                listIds.push(Projects[i]._id)
                if(i==Projects.length-1){
                    var log = new Log({
                        user: id,
                        object: listIds.toString(),
                        oldValue: JSON.stringify(Projects),
                        action: 'Project object list is requested'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        } else
                            return Projects
                    });
                }
            }
        }
        // Return the Projectd list that was retured by the mongoose promise
        return Projects;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.getProjectsByCriteria = async function (criteria, role, id) {
    var filter = {};
    //var reg = new RegExp('(?=.*?(string1))(?=.*?(string2))', 'i');

    if (criteria.projectEtap)
        filter.projectEtap = criteria.projectEtap

    if (criteria.criteriaCategory) {
        var cat = []
        criteria.criteriaCategory.forEach(element => {
            cat.push(mongoose.Types.ObjectId(element._id))
        })
        filter.category = { $in: cat }
        console.log('category = ' + cat)
    }

    if (criteria.city && criteria.region)
        filter.address = { $regex: new RegExp('(?=.*?(' + criteria.city + '))(?=.*?(' + criteria.region + '))', 'i') }
    else if (criteria.city)
        filter.address = { $regex: new RegExp(criteria.city, 'i') }
    else if (criteria.region)
        filter.address = { $regex: new RegExp(criteria.region, 'i') }

    if (criteria.itogoTotal && criteria.itogoTotalTo) {
        filter.itogoTotal = { $gte: criteria.itogoTotal, $lte: criteria.itogoTotalTo }
    }

    if (criteria.created && criteria.createdTo) {
        filter.created = { $gte: criteria.created, $lte: criteria.createdTo }
        console.log('created = ' + criteria.created + ' to = ' + criteria.createdTo)
    }

    if (criteria.landRequested && criteria.landRequestedTo)
        filter.landRequested = { $gte: criteria.landRequested, $lte: criteria.landRequestedTo }

    if (criteria.organisation)
        filter.organisation = { $regex: new RegExp(criteria.organisation.name, 'i') }

    if (criteria.Itogo_plowad && criteria.Itogo_plowad_To)
        filter.Itogo_plowad = { $gte: criteria.Itogo_plowad, $lte: criteria.Itogo_plowad_To }

    if (criteria.investSum)
        filter.investSum = criteria.investSum

    finances = [
        { "id": 'Private', "name": 'Собственные' },
        { "id": 'Borrowed', "name": 'Заемные' },
        { "id": 'Foreign', "name": 'Иностранные' },
        { "id": 'State', "name": 'Государственные программы (бюджетные средства)' }
    ]

    if (criteria.finans == 'Private')
        filter.finansPrivate = { $or: [{ $ne: 0 }, { $ne: 0.0 }] }
    if (criteria.finans == 'Borrowed')
        filter.finansPrivate = { $or: [{ $ne: 0 }, { $ne: 0.0 }] }
    if (criteria.finans == 'Foreign')
        filter.finansPrivate = { $or: [{ $ne: 0 }, { $ne: 0.0 }] }
    if (criteria.finans == 'State')
        filter.finansPrivate = { $or: [{ $ne: 0 }, { $ne: 0.0 }] }

    if (criteria.grafikInvestFrom && criteria.grafikInvestTo)
        filter.grafikInvest = { $elemMatch: { name: { $regex: new RegExp(criteria.grafikInvestFrom, 'i'), $regex: new RegExp(criteria.grafikInvestTo, 'i') } } }

    if (criteria.srokOkupaemost)
        filter.srokOkupaemost = criteria.srokOkupaemost

    if (criteria.expluatacia && criteria.expluataciaTo) {
        filter.expluatacia = { $gte: criteria.expluatacia, $lte: criteria.expluataciaTo }
    }

    if (criteria.dolyaSpkAstana)
        filter.dolyaSpkAstana = criteria.dolyaSpkAstana

    try {
        if(role){
            if(role == 'manager'){
                var user = await User.findById(id)
                if(user.role == 'manager'){
                    id = user.manager
                }
                filter.manager = id
            } else
                filter.investor = id
        }
        var Projects = await Project.find(filter)
        if(Projects){
            var listIds = []
            for(let i=0; i<Projects.length; i++){
                listIds.push(Projects[i]._id)
                if(i==Projects.length-1){
                    var log = new Log({
                        user: id,
                        object: listIds.toString(),
                        oldValue: JSON.stringify(Projects),
                        action: 'Project object list is requested'
                    })
                    log.save(function(err,doc){
                        if(err){
                            throw Error(err)
                        } else
                            return Projects
                    });
                }
            }
        }
        return Projects
    } catch (e) {
        throw Error(e)
    }
}

exports.getOrganisations = async function () {
    try {
        var Projects = await Project.find()
        // Return the Projectd list that was retured by the mongoose promise
        var orgs = [], organisations = []
        var j = 0
        Projects.forEach(element => {
            let i = orgs.indexOf(element.organisation)
            if (i == -1) {
                orgs.push(element.organisation)
            }
            j++
            if (j == Projects.length) {
                var ii = 1
                orgs.forEach(el => {
                    var obj = { "id": ii, "name": el }
                    organisations.push(obj)
                    ii++
                })
            }
        })

        return organisations;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error(e);
    }
}

exports.getProject = async function (id, userId) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the Project 
        var _updateProject = await Project.findOne({ _id: id });
        if(_updateProject){
            var log = new Log({
                user: userId,
                object: id,
                oldValue: JSON.stringify(_updateProject),
                action: 'Project object is requested'
            })
            log.save(function(err,doc){
                if(err){
                    throw Error(err)
                } else
                    return _updateProject
            });
        }
        return _updateProject;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e)
    }
}
