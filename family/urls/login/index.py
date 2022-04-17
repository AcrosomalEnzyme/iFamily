from django.urls import path, include
from family.views.login.login_index import login_index

# 将其他所有文件夹路径include进来的作用，可以仿造整个项目的urls.py
# 之后每个文件夹都要创建index.py，内容除了没有include其他都一样
urlpatterns = [
    # 第一个是直接添加主页的url，信息已经足够，不需要定位到具体文件夹继续往下查找
    path("", login_index, name="login_index"),
    # path("menu/", include("game.urls.menu.index")),
    # path("playground/", include("game.urls.playground.index")),
    # path("settings/", include("game.urls.settings.index")),
    ]
