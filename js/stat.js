'use strict';

var CLOUD_POINT_X = 100;
var CLOUD_POINT_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var DISPLACE = 10;
var COLOR_TEXT = 'Black';
var FONT_PROPERTIES = '16px PT Mono';
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var COLUMN_MAX_HEIGHT = 150;
var COLOR_MY_PLAYER = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, color, fonts, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = fonts;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_POINT_X + DISPLACE, CLOUD_POINT_Y + DISPLACE, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_POINT_X, CLOUD_POINT_Y, '#fff');

  renderText(ctx, COLOR_TEXT, FONT_PROPERTIES, 'Ура вы победили!', 120, 40);
  renderText(ctx, COLOR_TEXT, FONT_PROPERTIES, 'Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i += 1) {
    ctx.fillText(players[i], (CLOUD_POINT_X + COLUMN_WIDTH) + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - CLOUD_POINT_Y);
    if (players[i] === 'Вы') {
      ctx.fillStyle = COLOR_MY_PLAYER;
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random(0) * 100) + '%' + ', 50%)';
    }
    ctx.fillRect((CLOUD_POINT_X + COLUMN_WIDTH) + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - (COLUMN_WIDTH - DISPLACE) - (COLUMN_MAX_HEIGHT * times[i]) / maxTime, COLUMN_WIDTH, (COLUMN_MAX_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), (CLOUD_POINT_X + COLUMN_WIDTH) + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - COLUMN_WIDTH - (COLUMN_MAX_HEIGHT * times[i]) / maxTime);
  }
};
