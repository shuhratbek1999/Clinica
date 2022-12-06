'use strict';

var dbm;
var type;
var seed;
const sequelize = require('../src/db/db-sequelize')
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function() {
  return sequelize.query(
   "INSERT INTO `inspection_info_child` (`id`, `code`, `name`, `info_id`) VALUES \
   (1, 'H00', 'Гардеолум и халазион', 1),\
   (2, 'H01', 'Другие воспаления век', 1),\
   (3, 'H02', 'Другие болезни век', 1),\
   (4, 'H03', 'Поражения века при болезнях, классифицированных в других рубриках', 1),\
   (5, 'H04', 'Болезни слезного аппарата', 1),\
   (6, 'H05', 'Болезни глазницы', 1),\
   (7, 'H06', 'Поражения слезного аппарата и глазницы при болезнях, классифицированных в других рубриках', 1),\
   (8, 'H10', 'Конъюнктивит', 2),\
   (9, 'H11', 'Другие болезни конъюнктивы', 2),\
   (10, 'H13', 'Поражения конъюнктивы при болезнях, классифицированных в других рубриках', 2),\
   (11, 'H15', 'Болезни склеры', 3),\
   (12, 'H16', 'Кератит', 3),\
   (13, 'H17', 'Рубцы и помутнение роговицы', 3),\
   (14, 'H18', 'Другие болезни роговицы', 3),\
   (15, 'H19', 'Поражения склеры и роговицы при болезнях, классифицированных в других рубриках', 3),\
   (16, 'H20', 'Иридоциклит', 3),\
   (17, 'H21', 'Другие болезни радужной оболочки и цилиарного тела', 3),\
   (18, 'H22', 'Поражения радужной оболочки и цилиарного тела при болезнях, классифицированных в других рубриках', 3),\
   (19, 'H25', 'Старческая катаракта', 4),\
   (20, 'H26', 'Другие катаракты', 4),\
   (21, 'H27', 'Другие болезни хрусталика', 4),\
   (22, 'H28', 'Катаракта и другие поражения хрусталика при болезнях, классифицированных в других рубриках', 4),\
   (23, 'H50', 'Хориоретинальное воспаление', 5),\
   (24, 'H51', 'Другие болезни сосудистой оболочки глаза', 5),\
   (25, 'H52', 'Хориоретинальные нарушения при болезнях, классифицированных в других рубриках', 5),\
   (26, 'H53', 'Отслойка и разрыв сетчатки', 5),\
   (27, 'H54', 'Окклюзия сосудов сетчатки', 5),\
   (28, 'H55', 'Другие болезни сетчатки', 5),\
   (29, 'H56', 'Поражения сетчатки при болезнях, классифицированных в других рубриках', 5),\
   (30, 'H50', 'Глаукома', 6),\
   (31, 'H52', 'Глаукома при болезнях, классифицированных в других рубриках', 6),\
   (32, 'H53', 'Болезни стекловидного тела', 7),\
   (33, 'H54', 'Болезни глазного яблока', 7),\
   (34, 'H55', 'Поражения стекловидного тела и глазного яблока при болезнях, классифицированных в других рубриках', 7),\
   (35, 'H56', 'Неврит зрительного нерва', 8),\
   (36, 'H57', 'Другие болезни зрительного (2-го) нерва и зрительных путей', 8),\
   (37, 'H58', 'Поражения зрительного (2-го) нерва и зрительных путей при болезнях, классифицированных в других рубриках', 8),\
   (38, 'H59', 'Паралитическое косоглазие', 9),\
   (39, 'H50', 'Другие формы косоглазия', 9),\
   (40, 'H59', 'Другие нарушения содружественного движения глаз', 9),\
   (41, 'H50', 'Нарушения рефракции и аккомодации', 9),\
   (42, 'H51', 'Расстройства зрения', 10),\
   (43, 'H52', 'Слепота и пониженное зрение', 10),\
   (44, 'H53', 'Нистагм и другие непроизвольные движения глаз', 11),\
   (45, 'H54', 'Другие поражения глаза и его придаточного аппарата при болезнях, классифицированных в других рубриках', 11),\
   (46, 'H55', 'Поражения глаза и его придаточного аппарата после медицинских процедур', 11)"
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
