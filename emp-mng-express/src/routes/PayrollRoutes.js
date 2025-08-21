import express from 'express';
import { protect, hasPermission } from '../middleware/AuthMiddleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import {
   getPayrollPreviewData,
       initiatePayrollGeneration, 
       getEmployeeList,
       getReportStatus,
        getPayrollReport,
        getRecentReports } from '../controllers/PayrollController.js';

const router = express.Router();

router.use(protect);

router.get('/list-employees', 
hasPermission(PERMISSIONS.PAYROLL.SALARY_STRUCTURE.UPDATE),
   getEmployeeList)

router.post('/preview', hasPermission(PERMISSIONS.PAYROLL.GENERATE_REPORT), getPayrollPreviewData);


router.post('/initiate',
 hasPermission(PERMISSIONS.PAYROLL.GENERATE_REPORT),
  initiatePayrollGeneration);
router.get('/status/:reportId',
 hasPermission(PERMISSIONS.PAYROLL.GENERATE_REPORT),
 getReportStatus);
router.get('/report/:reportId',
 hasPermission(PERMISSIONS.PAYROLL.GENERATE_REPORT), getPayrollReport);
router.get('/recent',
 hasPermission(PERMISSIONS.PAYROLL.GENERATE_REPORT),
 getRecentReports);

export default router;