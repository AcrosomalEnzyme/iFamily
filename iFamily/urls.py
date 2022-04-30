"""iFamily URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from family.views.home_index import home_index

urlpatterns = [
    # 将game的url引导过来
    # 访问http://175.178.119.52:8000/，先去iFamily的urls下面去匹配，空的，进入到game/urls/index中去进一步查找，
    # 后面如果是menu，（path("menu/", include("game.urls.menu.index")),），就继续往下进入menu文件夹的index去查找，
    # 如果是空的，（path("", index, name="index"),）直接访问views文件夹下的index函数，（return render(request,"multiends/web.html")），
    # 所以会返回template文件夹下的multiends文件夹的web.html
    path("home/", home_index, name="home_index"),
    path("family/", include("family.urls.index")),
    path("game/", include("game.urls.index")),
    path("stock/", include("stock.urls.index")),
    path('admin/', admin.site.urls),
] 
#+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
