const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const colors                                      =                 ['#2185C5', '#7ECEFD', '#977EF2', '#FF7F66', '#23AD7B'];                  // 存储球颜色的数组
const ballShrinkRadius                            =                 3;                                                                        // 每一次碰撞大球减小的半径的大小
const ballRadiusRange                             =                 [12, 15, 18, 21, 24];                                                     // 大球的半径的取值范围，需要为 3 (ballShrinkRadius) 的倍数
const gravity                                     =                 1;                                                                        // 大球的重力加速度
const miniGravity                                 =                 0.1;                                                                      // 小球的重力加速度 （小一点球弹得高）
const crashEnergyLossRatio                        =                 0.9;                                                                      // 垂直方向由于碰撞失去能量
const frictionLoss                                =                 0.9;                                                                      // 水平方向由于摩擦力失去能量
const fallFrequency                               =                 125;                                                                      // 每隔 150 个单位时间掉落一个球
const miniBallSurviveTime                         =                 500;                                                                      // 小球存在的时间
const miniBallRadius                              =                 3;                                                                        // 小球半径
const miniBallVelocityX                           =                 10;                                                                       // 小球水平速率的区间长度
const miniBallVelocityY                           =                 40;                                                                       // 小球竖直速率的区间长度
let ticker                                        =                 0;                                                                        // 记录多少个单位时间
let ballArray                                     =                 [];
let miniBalls                                     =                 [];

function randomColor (colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function Ball(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: 15,
    y: 3
  }
}
Ball.prototype.draw  = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.fill();
  c.closePath();
};
Ball.prototype.update = function () {
  if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius + this.velocity.x <= 0) {
    this.velocity.x = -this.velocity.x;
    this.velocity.y = this.velocity.y * crashEnergyLossRatio;
    this.crash();
  }
  if (this.y + this.radius + this.velocity.y > canvas.height) {
    // 大球落地
    this.velocity.y = -this.velocity.y * crashEnergyLossRatio;
    this.velocity.x = this.velocity.x * frictionLoss;
    this.crash();
  } else {
    this.velocity.y += gravity;
  }
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.draw();
};
Ball.prototype.crash = function () {
  this.radius -= ballShrinkRadius;
  for (let i = 0; i < 8; i++) {
    miniBalls.push(new MiniBall(this.x, this.y, miniBallRadius, this.color));
  }
};

function MiniBall (x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: (Math.random() - 0.5) * miniBallVelocityX, // ( -5, 5 )
    y: (Math.random() - 0.5) * miniBallVelocityY // ( -20, 20 )
  };
  this.surviveTime = 100;
  this.opacity = 1 / miniBallSurviveTime;
}
MiniBall.prototype.draw = function () {
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.fill();
  c.closePath();
  c.restore();
};
MiniBall.prototype.update = function () {
  if (this.y + this.radius + this.velocity.y > canvas.height) {
    this.velocity.y = -this.velocity.y * crashEnergyLossRatio;
  } else {
    this.velocity.y += miniGravity; // 受小一点重力，弹得高点
  }
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.surviveTime--;
  this.opacity -= 1 / miniBallSurviveTime;
  this.draw();
};

function animate () {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  
  ballArray.forEach((ball, index) => {
    if (ball.radius <= 0) {
      ballArray.splice(index, 1);
    }
    ball.update();
  });
  miniBalls.forEach((miniBall, index) => {
    miniBall.update();
    if (miniBall.surviveTime === 0) {
      miniBalls.splice(index, 1);
    }
  });
  ticker++;
  if (ticker % fallFrequency === 0) {
    const radius = ballRadiusRange[Math.floor(Math.random() * ballRadiusRange.length)];
    const x = Math.random() * (canvas.width - radius) + radius; // 在 radius ~ canvas.width - radius 范围内产生球
    const color = randomColor(colors);
    ballArray.push(new Ball(x, -100, radius, color));
  }
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
});
animate();