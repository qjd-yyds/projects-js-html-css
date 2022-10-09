const verticalButton = document.querySelector("#vertical")
const acrossButton = document.querySelector("#across")
const verticalIpt = document.querySelector("#vertical-number")
const acrossIpt = document.querySelector("#across-number")
const canvas = document.querySelector("#canvas")

// 求两条线的交点
function calcLinePoint(a, b, c, d) {
    /** 1 解线性方程组, 求线段交点. **/
// 如果分母为0 则平行或共线, 不相交
    let denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y);
    if (denominator === 0) {
        return false;
    }

// 线段所在直线的交点坐标 (x , y)
    let x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y)
        + (b.y - a.y) * (d.x - c.x) * a.x
        - (d.y - c.y) * (b.x - a.x) * c.x) / denominator;
    let y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x)
        + (b.x - a.x) * (d.y - c.y) * a.y
        - (d.x - c.x) * (b.y - a.y) * c.y) / denominator;

    /** 2 判断交点是否在两条线段上 **/
    if (
        // 交点在线段1上
        (x - a.x) * (x - b.x) <= 0 && (y - a.y) * (y - b.y) <= 0
        // 且交点也在线段2上
        && (x - c.x) * (x - d.x) <= 0 && (y - c.y) * (y - d.y) <= 0
    ) {

        // 返回交点p
        return {
            x: x,
            y: y
        }
    }
    //否则不相交
    return false
}

class Player {
    ctx = canvas.getContext("2d")
    config = {
        w: 0,
        h: 0,
        centerX: 0,
        centerY: 0,
        points: [],
        node: []
    }
    // 当前高亮图形
    currentPolygon = null

    constructor(canvasDom) {
        this.ctx = canvasDom.getContext("2d")
    }

    setupConfig = (x, y, w, h) => {
        const {ctx} = this
        this.config = {
            points: [
                [
                    {x: 0, y: 0},
                    {x: 0, y: h},
                ],
                [
                    {x: w, y: h},
                    {x: w, y: 0}
                ]

            ],
            node: [],
            w,
            h,
            centerX: x,
            centerY: y
        }
        ctx.translate(x, y)
    }
    getLinePoint = () => {
        const {config} = this
        const {points} = config
        const list = []
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const point = calcLinePoint(...points[i], ...points[j])
                if (point) {
                    list.push(point)
                }
            }
        }
        config.node = [...list
        ]
    }
    drawVerticalLine = () => {
        const {ctx, config} = this
        const {points} = config
        const value = verticalIpt.value || 0
        ctx.beginPath()
        // 生成两个交点
        const pointsLine = [
            {
                x: value,
                y: 0
            },
            {
                x: value,
                y: config.centerY
            }
        ]
        points.push(pointsLine)
        ctx.moveTo(value, 0)
        ctx.lineTo(value, config.h)
        ctx.stroke()
        ctx.closePath()
        this.getLinePoint()
    }
    drawAcrossLine = () => {
        const {ctx, config} = this
        const {points} = config
        const value = acrossIpt.value || 0
        ctx.beginPath()
        // 生成两个交点
        const pointsLine = [
            {
                x: 0,
                y: value
            },
            {
                x: config.centerX,
                y: value
            }
        ]
        points.push(pointsLine)
        ctx.moveTo(0, value)
        ctx.lineTo(config.w, value)
        ctx.stroke()
        ctx.closePath()
        this.getLinePoint()
    }
    init = (color = "#fff") => {
        this.setupConfig(100, 100, 400, 225)
        const {config, ctx} = this
        ctx.fillStyle = color
        ctx.strokeStyle = "red"
        ctx.fillRect(0, 0, config.w, config.h)
    }
    drawRect = (x, y, w, h, color = "yellow") => {
        const {ctx} = this
        ctx.save()
        ctx.fillStyle = color
        ctx.fillRect(x, y, w, h)
        ctx.restore()
    }
    clearRect = () => {
        const {ctx, config} = this
        ctx.clearRect(0, 0, config.w, config.h)
    }
}

const player = new Player(canvas)
player.init()
window.player = player
canvas.onmousemove = (e) => {
    // 鼠标在上面的坐标
    const posX = e.clientX - player.config.centerX
    const posY = e.clientY - player.config.centerY
    // 判断是否超出边界
    if (posX < 0 || posX > player.config.w || posY < 0 || posY > player.config.h) {
        return
    }
    // 高亮当前矩形
    const findPoints = () => {
        let leftX = 0
        let rightX = player.config.w
        let bottomY = player.config.h
        let topY = 0
        player.config.node.forEach(item => {
            if (item.x < posX) {
                leftX = Math.max(item.x, leftX)
            }
            if (item.x > posX) {
                rightX = Math.min(item.x, rightX)
            }
            if (item.y > posY) {
                bottomY = Math.min(item.y, bottomY)
            }
            if (item.y < posY) {
                topY = Math.max(item.y, topY)
            }
        })
        let width = rightX - leftX
        let height = bottomY - topY
        return {
            x: leftX,
            y: topY,
            width,
            height
        }
    }
    const container = findPoints()
    canvas.onclick = () => {
        // 绘制图形高亮
        player.clearRect()
        player.drawRect(0, 0, player.config.w, player.config.h, "#fff")
        player.drawRect(container.x, container.y, container.width, container.height)
        player.setupConfig(container.x, container.y, container.width, container.height)
    }

}
