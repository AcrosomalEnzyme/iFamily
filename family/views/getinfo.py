#必须要加的头文件
from django.http import JsonResponse
#添加数据库表
from game.models.player.player import Player
from family.models.member.member import Member

def getinfo(request):
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
