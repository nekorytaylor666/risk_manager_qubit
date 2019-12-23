var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
/*var Category = require('./category.model')
var ProjectRole = require('./project_role.model')
var Manager = require('./manager.model')
var User = require('./user.model')*/

var ProjectSchema = new mongoose.Schema({
    name: String,
    category: mongoose.Schema.Types.ObjectId,//Category,
    bin: String,
    organisation: String,
    address: String,
    phone: String,
    email: String,
    web: String,
    registration: String,
    fioDirector: String,
    project_role: mongoose.Schema.Types.ObjectId,//ProjectRole,
    personalCount: Number,
    financialReport1: String,//file
    financialReport2: String,//file
    financialReport3: String,//file
    descriptionNote1: String,//file
    descriptionNote2: String,//file
    descriptionNote3: String,//file
    garantyLetter: String,//file
    financialReport1_date: String,//file
    financialReport2_date: String,//file
    financialReport3_date: String,//file
    descriptionNote1_date: String,//file
    descriptionNote2_date: String,//file
    descriptionNote3_date: String,//file
    garantyLetter_date: String,//file
    financialReport1_status: [Object],//file
    financialReport2_status: [Object],//file
    financialReport3_status: [Object],//file
    descriptionNote1_status: [Object],//file
    descriptionNote2_status: [Object],//file
    descriptionNote3_status: [Object],//file
    garantyLetter_status: [Object],//file
    financialReport1_srok: String,//file
    financialReport2_srok: String,//file
    financialReport3_srok: String,//file
    descriptionNote1_srok: String,//file
    descriptionNote2_srok: String,//file
    descriptionNote3_srok: String,//file
    garantyLetter_srok: String,//file
    ProjectDescription: String,
    ProjectAim: String,
    ProjectInnovation: String,
    ProjectUniqueness: String,
    ProjectApplication: String,
    ProjectPerspective: String,
    companyInfo: String,
    ProjectLeaderDescription: String,
    participationOfParties: String,
    Innovations: String,

    landSpkAstana: Number,
    landInitiator: Number,
    landInvested: Number,
    landTotal: Number, //landSpkAstana + landInitiator + landInvested
    buildingSpkAstana: Number,
    buildingInitiator: Number,
    buildingInvested: Number,
    buildingTotal: Number, //buildingSpkAstana + buildingInitiator + buildingInvested
    technicaSpkAstana: Number,
    technicaInitiator: Number,
    technicaInvested: Number,
    technicaTotal: Number, //technicaSpkAstana + technicaInitiator + technicaInvested
    oborotSpkAstana: Number,
    oborotInitiator: Number,
    oborotInvested: Number,
    oborotTotal: Number, //oborotSpkAstana + oborotInitiator + oborotInvested
    otherSpkAstana: Number,
    otherInitiator: Number,
    otherInvested: Number,
    otherTotal: Number, //otherSpkAstana + otherInitiator + otherInvested
    itogoSpkAstana: Number,
    itogoInitiator: Number,
    itogoInvested: Number,
    itogoTotal: Number, //itogoSpkAstana + itogoInitiator + itogoInvested
    dolyaSpkAstana: String,
    dolyaInitiator: String,
    dolyaInvested: String,
    dolyaTotal: String, //dolyaSpkAstana + dolyaInitiator + dolyaInvested

    valovayaVyruchka: Number,//tenge
    valovoyProduction: Number,//edinica
    rashodyProduction: Number,//tenge
    operationalProfit: Number,
    pogashenieObyazatelstv: Number,
    otherRashody: Number,
    taxes: Number,
    profit: Number,
    totalPeriod: Number, //years

    valovayaVyruchkaYear: Number,//tenge
    valovoyProductionYear: Number,//edinica
    rashodyProductionYear: Number,//tenge
    operationalProfitYear: Number,
    pogashenieObyazatelstvYear: Number,
    otherRashodyYear: Number,
    taxesYear: Number,
    profitYear: Number,
    valovayaVyruchkaPeriod: Number,//tenge
    valovoyProductionPeriod: Number,//edinica
    rashodyProductionPeriod: Number,//tenge
    operationalProfitPeriod: Number,
    pogashenieObyazatelstvPeriod: Number,
    otherRashodyPeriod: Number,
    taxesPeriod: Number,
    profitPeriod: Number,

    notes: String,
    landRequested: Number, //га
    landRequestedAddress: String,
    placementRequest: String,
    landSchema: String, //file
    projectConcept: String, //file
    foreskiz: String, //file
    landSchema_date: String, //file
    projectConcept_date: String, //file
    foreskiz_date: String, //file
    landSchema_status: [Object], //file
    projectConcept_status: [Object], //file
    foreskiz_status: [Object], //file
    landSchema_srok: String, //file
    projectConcept_srok: String, //file
    foreskiz_srok: String, //file
    manager: String,//mongoose.Schema.Types.ObjectId,//Manager,
    lawyer: String,//mongoose.Schema.Types.ObjectId,//Lawyer,
    financier: String,//mongoose.Schema.Types.ObjectId,//Financier,
    investor: String,//mongoose.Schema.Types.ObjectId,//User
    created: {
        type: Date,
        default: Date.now
    },

    projectEtap: Number,
    investSum: Number,
    investSumStatus: [Object],
    investSumSrok: String,
    grafikInvest: [Object], // {name:2019, summa:456, status: ['Не принято'], srok: '30.09.2019'}
    NPV: String,
    NPVstatus: [Object],
    NPVsrok: String,
    IRR: String,
    IRRstatus: [Object],
    IRRsrok: String,
    srokOkupaemost: Number,
    srokOkupaemostStatus: [Object],
    srokOkupaemostSrok: String,
    summaOneMeter: Number,
    summaOneMeterStatus: [Object],
    summaOneMeterSrok: String,
    rentabelnost: Number,
    rentabelnostStatus: [Object],
    rentabelnostSrok: String,
    finansirovanie: Number,// =investSum
    finansPrivate: Number,
    finansPrivateStatus: [Object],
    finansPrivateSrok: String,
    finansBorrowed: Number,
    finansBorrowedStatus: [Object],
    finansBorrowedSrok: String,
    finansForeign: Number,
    finansForeignStatus: [Object],
    finansForeignSrok: String,
    finansState: Number,
    finansStateStatus: [Object],
    finansStateSrok: String,
    expluatacia: Date,
    grafikStroyka: String,
    grafikStroykaNote: String,
    S_vsego: Number,
    S_obwaya: Number,//S1+S2+S3
    S_kondominium: Number,
    A_jilaya_plowad: Number,
    B_parking_plowad: Number,
    C_commerce_plowad: Number,
    Itogo_plowad: Number, //A+B+C
    S1_A_dolyaSPK: Number,
    S2_B_dolyaSPK: Number,
    S3_C_dolyaSPK: Number,
    ABC_itogo_dolyaSPK: Number,
    X1_dolyaObwaya: Number,
    X2_dolyaObwaya: Number,
    X3_dolyaObwaya: Number,
    Z1_kondominium: Number,
    Z2_kondominium: Number,
    Z3_kondominium: Number,
    W1_Z1_dolyaSpk: Number,
    W2_Z2_dolyaSpk: Number,
    W3_Z3_dolyaSpk: Number,
    W_obwaya: Number,//W1+W2+W3
    jilaya_plowad: Number,//S1+W1
    parking_plowad: Number,//S2+W2
    commerce_plowad: Number,//S3+W3
    itogo: Number,//S1+S2+S3+W1+W2+W3

    steps: Array, // [{name:'', dates: {start:'', end:''}, files: [{name:'', dateD: ''}], comments: []}]
    files: [Object],
    comments: [String],
    dates: {
      start: String,//Дата регистрации: @дата принятия менеджером анкеты
      end: String//Дата окончания: @когда закончился весь второй этап
    },
    expanded: Boolean,
    
    status: String,
    status2: String,
    status2Lawyer: String,
    status2Financier: String,
    anketaComments: [String],
    anketaComments2: [String],
    anketaComments2Lawyer: [String],
    anketaComments2Financier: [String],
    anketaSrok: String,
    anketaSrok2: String,
    anketaSrok2Lawyer: String,
    anketaSrok2Financier: String,
    editManager: Boolean,
    codeEnteredLawyer:String,
    codeEnteredFinancier:String
})
ProjectSchema.plugin(mongoosePaginate)
const Project = mongoose.model('Projects', ProjectSchema)

module.exports = Project;