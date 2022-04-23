#必须要加的头文件
from django.http import JsonResponse
#添加数据库表
from game.models.player.player import Player
from family.models.member.member import Member

    #处理web端发来的请求
def getinfo_web(request):

    #获取到发送请求的用户
    user = request.user

    #利用内置函数判断用户是否登录
    if not user.is_authenticated:
        return JsonResponse({
            'result' : "未登录"
            })
    else:
        #查找当前用户的信息
        member = Member.objects.filter(user=user).first()
        photo_url = member.photo.url
        return JsonResponse({
            'result' : "success",
            'username' : user.username,
            'photo' : photo_url,
        })



    #处理请求的都要加request
def getinfo(request):
    #判断是从哪个平台发过来的
    platform = request.GET.get('platform')
    if platform == "WEB":
        return getinfo_web(request)
