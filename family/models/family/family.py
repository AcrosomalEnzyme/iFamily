#创建数据库表必须要引入的类
from django.db import models
from django.contrib.auth.models import User
#from family.models.member.member import Member

class Family(models.Model):
    #家庭的名称，字数最多32个字
    family_name = models.CharField(max_length=50,verbose_name="家庭名称")
    #家庭的密码
    family_password = models.CharField(max_length=50)
