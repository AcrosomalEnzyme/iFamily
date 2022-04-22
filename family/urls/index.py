from django.urls import path, include
#from family.views.index import index

# 将其他所有文件夹路径include进来的作用，可以仿造整个项目的urls.py
# 之后每个文件夹都要创建index.py，内容除了没有include其他都一样
urlpatterns = [
    # 第一个是直接添加主页的url，信息已经足够，不需要定位到具体文件夹继续往下查找
    # path("game/", index, name="index"),
     path("login/", include("family.urls.login.index")),
     path("register/", include("family.urls.register.index")),
    # path("family/", include("game.urls.settings.index")),
]
