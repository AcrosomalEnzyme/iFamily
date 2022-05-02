# 创建数据库表必须要引入的类
from django.db import models
from django.contrib.auth.models import User
from family.models.family.family import Family


# 创建member类，需要引入models的Model类
class Member(models.Model):
    # member这个表是从user扩充过来的，user与User的表一一对应，user删除的时候，和其关联的player一样会被删除掉
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # 头像是一个链接，最大长度256，可以为空
    photo = models.FileField(upload_to="image/member_photo/", default="image/member_photo/default_photo.png")

    # 最近在线时间
    last_active_time = models.DateTimeField(auto_now=True)

    # 存储自选股票
    stock_code = models.FileField(upload_to="txt/member_stock/", default="txt/member_stock/default_member_stock.txt")

    # 隶属家庭
    family = models.ForeignKey(Family, on_delete=models.CASCADE, blank=True, null=True)

    # 展示用户的名字
    def __str__(self):
        return str(self.user)
