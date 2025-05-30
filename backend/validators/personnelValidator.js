// ✅ backend/validators/personnelValidator.js
import { body } from 'express-validator'

export const personnelRules = {
  create: [
    body('name').notEmpty().withMessage('Ad boş bırakılamaz'),
    body('email').optional().isEmail().withMessage('Geçerli email girin'),
    body('phone').notEmpty().withMessage('Telefon zorunludur'),
    body('criminal_record').optional().isString(),
    body('children_count').optional().isInt({ min: 0 }),
    body('start_date').optional().isISO8601().toDate(),
    body('end_date').optional().customSanitizer((v) => (v === "" ? undefined : v)).isISO8601().toDate(),
    body('data.*.birth_date').optional().isISO8601().toDate()
  ],

  update: [
    body('name').optional().isString(),
    body('email').optional().isEmail(),
    body('phone').optional().isString(),
    body('children_count').optional().isInt({ min: 0 }),
    body('start_date').optional().isISO8601().toDate(),
    body('end_date').optional().customSanitizer((v) => (v === "" ? undefined : v)).isISO8601().toDate(),
    body('data.*.birth_date').optional().isISO8601().toDate()
  ],

  import: [
    body('data').isArray().withMessage('Toplu veri dizisi eksik'),
    body('data.*.name').notEmpty().withMessage('Her personelin adı olmalı'),
    body('data.*.phone').notEmpty().withMessage('Telefon bilgisi gerekli'),
    body('data.*.email').optional().isEmail().withMessage('Geçerli email adresi girin'),
    body('data.*.criminal_record').optional().isString(),
    body('data.*.children_count').optional().isInt({ min: 0 }),
    body('data.*.start_date').optional().isISO8601().toDate(),
    body('data.*.end_date').optional().isISO8601().toDate(),
    body('data.*.birth_date').optional().isISO8601().toDate()
  ]
}
