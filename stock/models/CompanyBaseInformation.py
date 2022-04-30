# 创建数据库表必须要引入的类
from django.db import models


# 创建Company_Base_Information类，需要引入models的Model类

class CompanyBaseInformation(models.Model):
    # 股票代码
    company_id = models.CharField(max_length=10)
    # 股票简称
    simple_name = models.CharField(max_length=10)
    # 公司全称
    name = models.CharField(max_length=30)
    # 英文简称
    eng_id = models.CharField(max_length=10)
    # 上市交易所
    place = models.CharField(max_length=5,default="")
