from django.urls import path, include
from family.views.register.register_index import register_index
from family.views.register.register import register

# 将其他所有文件夹路径include进来的作用，可以仿造整个项目的urls.py
# 之后每个文件夹都要创建index.py，内容除了没有include其他都一样
urlpatterns = [
    # 第一个是直接添加主页的url，信息已经足够，不需要定位到具体文件夹继续往下查找
    path("", register_index, name="register_index"),
    path("register/", register, name="register"),
    # path("playground/", include("game.urls.playground.index")),
    # path("settings/", include("game.urls.settings.index")),
    ]
