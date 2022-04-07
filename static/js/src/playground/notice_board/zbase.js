class NoticeBoard extends AcGameObject
{
    constructor(playground)
    {
        super();

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.text = "房间内人数：0人";

    }

    start()
    {}

    //记分牌中的内容
    write(text)
    {
        this.text = text;
    }

    update()
    {
        this.render();
    }

    render()
    {
        this.ctx.font = "20px serif";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text, this.playground.width / 2, 20);
    }
}