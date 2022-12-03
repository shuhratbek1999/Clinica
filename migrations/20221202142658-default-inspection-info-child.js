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
   "INSERT INTO `inspection_info_child` (`id`, `name`, `info_id`) VALUES \
   (1, 'Гардеолум и халазион', 1),\
   (2, 'Другие воспаления век', 1),\
   (3, 'Другие болезни век', 1),\
   (4, 'Поражения века при болезнях, классифицированных в других рубриках', 1),\
   (5, 'Болезни слезного аппарата', 1),\
   (6, 'Болезни глазницы', 1),\
   (7, 'Поражения слезного аппарата и глазницы при болезнях, классифицированных в других рубриках', 1),\
   (8, 'Конъюнктивит', 2),\
   (9, 'Другие болезни конъюнктивы', 2),\
   (10, 'Поражения конъюнктивы при болезнях, классифицированных в других рубриках', 2),\
   (11, 'Болезни склеры', 3),\
   (12, 'Кератит', 3),\
   (13, 'Другие болезни роговицы', 3),\
   (14, 'Поражения склеры и роговицы при болезнях, классифицированных в других рубриках', 3),\
   (15, 'Иридоциклит', 3),\
   (16, 'Другие болезни радужной оболочки и цилиарного тела', 3),\
   (17, 'Поражения радужной оболочки и цилиарного тела при болезнях, классифицированных в других рубриках', 3),\
   (18, 'Старческая катаракта', 4),\
   (19, 'Другие катаракты', 4),\
   (20, 'Другие болезни хрусталика', 4),\
   (21, 'Катаракта и другие поражения хрусталика при болезнях, классифицированных в других рубриках', 4),\
   (22, 'Хориоретинальное воспаление', 5),\
   (23, 'Другие болезни сосудистой оболочки глаза', 5),\
   (24, 'Хориоретинальные нарушения при болезнях, классифицированных в других рубриках', 5),\
   (25, 'Окклюзия сосудов сетчатки', 5),\
   (26, 'Другие болезни сетчатки', 5),\
   (27, 'Поражения сетчатки при болезнях, классифицированных в других рубриках', 5),\
   (28, 'Глаукома', 6),\
   (29, 'Глаукома при болезнях, классифицированных в других рубриках', 6),\
   (30, 'Болезни стекловидного тела', 7),\
   (31, 'Болезни глазного яблока', 7),\
   (32, 'Поражения стекловидного тела и глазного яблока при болезнях, классифицированных в других рубриках', 7),\
   (33, 'Неврит зрительного нерва', 8),\
   (34, 'Другие болезни зрительного (2-го) нерва и зрительных путей', 8),\
   (35, 'Поражения зрительного (2-го) нерва и зрительных путей при болезнях, классифицированных в других рубриках', 8),\
   (36, 'Паралитическое косоглазие', 9),\
   (37, 'Другие формы косоглазия', 9),\
   (38, 'Другие нарушения содружественного движения глаз', 9),\
   (39, 'Нарушения рефракции и аккомодации', 9),\
   (40, 'Расстройства зрения', 10),\
   (41, 'Слепота и пониженное зрение', 10),\
   (42, 'Нистагм и другие непроизвольные движения глаз', 11),\
   (43, 'Другие поражения глаза и его придаточного аппарата при болезнях, классифицированных в других рубриках', 11),\
   (44, 'Поражения глаза и его придаточного аппарата после медицинских процедур', 11)"
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
