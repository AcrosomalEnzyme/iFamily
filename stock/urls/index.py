# -*- coding: utf-8 -*-g
# @Time : 2022/4/30 22:13
# @Author : Blink_Leo
# @File : index.py
# @Software: PyCharm
from django.urls import path, include
from stock.views.spider.get_company_base_information import get_company_base_information
from stock.views.plate_index import plate_up_index, plate_down_index
from stock.views.plate_data import plate_data
from stock.views.my_select_index import my_select_index
from stock.views.company_detail_index import company_detail_index
from stock.views.company_detail_information import company_detail_information
from stock.views.select import select

# 将其他所有文件夹路径include进来的作用，可以仿造整个项目的urls.py
# 之后每个文件夹都要创建index.py，内容除了没有include其他都一样
urlpatterns = [
    # 第一个是直接添加主页的url，信息已经足够，不需要定位到具体文件夹继续往下查找
    path("select/", select, name="select"),
    path("company_detail_information/", company_detail_information, name="company_detail_information"),
    path("company_detail/", company_detail_index, name="company_detail_index"),
    path("my_select/", my_select_index, name="my_select_index"),
    # path("get_company_base_information/", get_company_base_information, name="get_company_base_information"),
    path("plate_up/", plate_up_index, name="plate_up_index"),
    path("plate_down/", plate_down_index, name="plate_down_index"),
    path("plate_data/", plate_data, name="plate_data"),
]
