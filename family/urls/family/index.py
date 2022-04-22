from django.urls import path, include
from family.views.family.family_create_index import family_create_index
from family.views.family.family_join_index import family_join_index
from family.views.login.getinfo import getinfo
from family.views.family.family_create import family_create

# 将其他所有文件夹路径include进来的作用，可以仿造整个项目的urls.py
# 之后每个文件夹都要创建index.py，内容除了没有include其他都一样
urlpatterns = [
    # 第一个是直接添加主页的url，信息已经足够，不需要定位到具体文件夹继续往下查找
    path("family_create_index", family_create_index, name="family_create_index"),
    path("family_join_index/", family_join_index, name="family_join_index"),
    path("getinfo/", getinfo, name="getinfo"),
    path("family_create/", family_create, name="family_create"),

]
