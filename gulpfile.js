var gulp = require('gulp');
var clean = require('gulp-clean');
var closureCompiler = require('gulp-closure-compiler');

gulp.task('default', function() {
	gulp.start('buildJS', 'updateAssets');
})

gulp.task('clean-build', function () {
	return gulp.src('build/*', {read: false})
		.pipe(clean());
});

gulp.task('buildJS', ['clean-build'], function() {
	return gulp.src([
		// Might be better to switch to a glob,
		// but load order is important for certain modules.
		'app.js',
		'js/assets.js',
		'js/utility.js',
		'js/input.js',
		'js/text.js',
		'js/button.js',
		'js/gui.js',
		'js/gamecache.js',
		'js/saver.js',
		'js/statuseffect.js',
		'js/ability.js',
		'js/stat.js',
		'js/pregnancy.js',
		'js/lactation.js',
		'js/body/gender.js',
		'js/body/color.js',
		'js/body/race.js',
		'js/body/bodypart.js',
		'js/body/appendage.js',
		'js/body/balls.js',
		'js/body/breasts.js',
		'js/body/orifice.js',
		'js/body/butt.js',
		'js/body/cock.js',
		'js/body/vagina.js',
		'js/body/hair.js',
		'js/body/head.js',
		'js/body/genitalia.js',
		'js/body/body.js',
		'js/defbody.js',
		'js/entity.js',
		'js/entity-combat.js',
		'js/entity-desc.js',
		'js/entity-grammar.js',
		'js/entity-menu.js',
		'js/entity-save.js',
		'js/entity-sex.js',
		'js/entity-dict.js',
		'js/event/player.js',
		'js/party.js',
		'js/perks.js',
		'js/combat.js',
		'js/enemy/boss.js',
		'js/time.js',
		'js/event.js',
		'js/world.js',
		'js/exploration.js',
		'js/maze.js',
		'js/ability/node.js',
		'js/ability/attack.js',
		'js/ability/physical.js',
		'js/ability/seduction.js',
		'js/ability/tease.js',
		'js/ability/wait.js',
		'js/ability/run.js',
		'js/ability/white.js',
		'js/ability/black.js',
		'js/ability/enemyskill.js',
		'js/job.js',
		'js/item.js',
		'js/inventory.js',
		'js/tf.js',
		'js/items/quest.js',
		'js/items/ingredients.js',
		'js/items/alchemy.js',
		'js/items/alchemyspecial.js',
		'js/items/toys.js',
		'js/items/cards.js',
		'js/items/combatitems.js',
		'js/items/accessories.js',
		'js/items/armor.js',
		'js/items/strapon.js',
		'js/items/weapons.js',
		'js/items/halloween.js',
		'js/shop.js',
		'js/alchemy.js',
		'js/quest.js',
		'js/cavalcade.js',
		'js/prison.js',
		'js/event/introduction.js',
		'js/loc/rigard/rigard.js',
		'js/loc/rigard/residential.js',
		'js/loc/rigard/guards.js',
		'js/loc/rigard/merchants.js',
		'js/loc/rigard/plaza.js',
		'js/loc/rigard/slums.js',
		'js/loc/rigard/tavern.js',
		'js/loc/rigard/brothel.js',
		'js/loc/rigard/krawitz.js',
		'js/loc/rigard/castle.js',
		'js/loc/rigard/clothstore.js',
		'js/loc/rigard/sexstore.js',
		'js/loc/rigard/magicshop.js',
		'js/loc/rigard/armorshop.js',
		'js/loc/rigard/weaponshop.js',
		'js/loc/rigard/inn.js',
		'js/loc/rigard/magetower.js',
		'js/loc/treecity/treecity.js',
		'js/loc/plains.js',
		'js/loc/nomads.js',
		'js/loc/highlands.js',
		'js/loc/dragonden.js',
		'js/loc/forest.js',
		'js/loc/desert.js',
		'js/loc/farm.js',
		'js/loc/lake.js',
		'js/loc/kingsroad.js',
		'js/loc/oasis.js',
		'js/loc/outlaws.js',
		'js/loc/glade.js',
		'js/loc/burrows.js',
		'js/event/global.js',
		'js/event/dreams.js',
		'js/event/nursery.js',
		'js/event/masturbation.js',
		'js/event/asche.js',
		'js/event/asche-tasks.js',
		'js/event/asche-sex.js',
		'js/event/cassidy.js',
		'js/event/cassidy-sex.js',
		'js/event/fera.js',
		'js/event/miranda.js',
		'js/event/miranda-date.js',
		'js/event/miranda-sex.js',
		'js/event/terry.js',
		'js/event/terry-tf.js',
		'js/event/terry-sex.js',
		'js/event/momo.js',
		'js/event/sylistraxia.js',
		'js/event/kiakai.js',
		'js/event/kiakai-sex.js',
		'js/event/brothel/roa.js',
		'js/event/brothel/ches.js',
		'js/event/brothel/lucille.js',
		'js/event/brothel/belinda.js',
		'js/event/brothel/bastet.js',
		'js/event/brothel/gryphons.js',
		'js/event/brothel/fireblossom.js',
		'js/event/burrows/lagon.js',
		'js/event/burrows/lagon-defeated.js',
		'js/event/burrows/ophelia.js',
		'js/event/burrows/vena.js',
		'js/event/burrows/vena-restored.js',
		'js/event/farm/gwendy.js',
		'js/event/farm/gwendy-sex.js',
		'js/event/farm/adrian.js',
		'js/event/farm/danie.js',
		'js/event/farm/layla.js',
		'js/event/farm/layla-sex.js',
		'js/event/highlands/isla.js',
		'js/event/uru.js',
		'js/event/aria.js',
		'js/event/royals/lei.js',
		'js/event/royals/lei-tasks.js',
		'js/event/royals/lei-sex.js',
		'js/event/royals/twins.js',
		'js/event/royals/jeanne.js',
		'js/event/royals/golem.js',
		'js/event/room69.js',
		'js/event/poet.js',
		'js/event/nomads/chief.js',
		'js/event/nomads/patchwork.js',
		'js/event/nomads/rosalin.js',
		'js/event/nomads/estevan.js',
		'js/event/nomads/cale.js',
		'js/event/nomads/cale-sex.js',
		'js/event/nomads/magnus.js',
		'js/event/nomads/cavalcade.js',
		'js/event/outlaws/outlaws.js',
		'js/event/outlaws/aquilius.js',
		'js/event/outlaws/maria.js',
		'js/event/outlaws/maria-dd.js',
		'js/event/outlaws/cveta.js',
		'js/event/outlaws/cveta-date.js',
		'js/event/outlaws/vaughn.js',
		'js/event/outlaws/vaughn-sex.js',
		'js/event/outlaws/vaughn-tasks.js',
		'js/event/outlaws/bulltower.js',
		'js/event/outlaws/cavalcade.js',
		'js/event/raven.js',
		'js/event/roaming.js',
		'js/event/portalopening.js',
		'js/event/citywatch.js',
		'js/event/halloween.js',
		'js/enemy/bandit.js',
		'js/enemy/knight.js',
		'js/enemy/imp.js',
		'js/enemy/introdemon.js',
		'js/enemy/rabbit.js',
		'js/enemy/equine.js',
		'js/enemy/feline.js',
		'js/enemy/lizard.js',
		'js/enemy/mothgirl.js',
		'js/enemy/feralwolf.js',
		'js/enemy/scorp.js',
		'js/enemy/naga.js',
		'js/enemy/drake.js',
		'js/enemy/zebra.js',
		'js/enemy/orchid.js',
		'js/enemy/gol.js',
		'js/enemy/corishev.js',
		'js/enemy/malice-scouts.js',
		'js/main.js',
		'js/credits.js',
		'js/cheats.js'
	],{ base: '.'}).pipe(closureCompiler({
		// NOTE: Remove "base : '.'" if we switch to using globs,
		// since paths are flattened up to the first glob
		compilerPath: 'compiler.jar',
		fileName: 'foe.min.js',
		continueWithWarnings: true
	})).pipe(gulp.dest('./build/'));
});

gulp.task('updateAssets', ['clean-build'], function() {
	return gulp.src([
		'js/excanvas.compiled.js',
		'js/lodash.min.js',
		'js/jquery-1.9.1.min.js',
		'js/raphael-min.js',
		'js/pre-loader.js',
		'js/droidsans.loader.js',
		'foe.html',
		'style.css',
		'output.css',
		'droidsans.css',
		'download.php',
		'changelog',
		'data/**/*',
	], { base: '.'}).pipe(gulp.dest('./build/'))
});
