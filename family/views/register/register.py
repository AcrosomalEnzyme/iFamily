from django.forms import forms
from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player
from family.models.member.member import Member


def register(request):
    # form_obj = forms.Register()

    # 获取前端传入的用户名，默认为空。strip可以去除字符串前后空格
    username = request.POST.get("username", "")
    password = request.POST.get("password", "").strip()
    password_confirm = request.POST.get("password_confirm", "").strip()
    photo = request.FILES.get("photo")

    print("test")
    test = request.POST.get('username')
    print(username)
    print(password)
    print(request.POST)
    print("test end")

    # 如果用户名或者密码是空的，返回错误
    if not username or not password:
        return JsonResponse({
            'result': "用户名和密码不能为空"
        })

    # 如果两次密码不一致，返回错误
    if password != password_confirm:
        return JsonResponse({
            'result': "两次密码不一致"
        })

    # 如果用户名存在
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': "用户名已存在"
        })

    # 条件都满足，可以在user表创建用户
    # 存入用户名字和密码，密码存的是哈希值
    user = User(username=username)
    user.set_password(password)
    user.save()

    if not photo:
        # 在member表创建用户
        Member.objects.create(user=user)
        # 在player表创建用户
        Player.objects.create(user=user, photo="http://175.178.119.52/static/image/member_photo/default_photo.png")
    else:
        # 求出文件名后缀，与用户名称拼接
        last_name = str(photo.name).split('.')[-1]
        last_name = "." + last_name
        file_name = str(username) + last_name
        photo.name = file_name
        Member.objects.create(user=user, photo=photo)
        Player.objects.create(user=user, photo="http://175.178.119.52/static/image/member_photo/" + str(photo.name))


    # 创建完直接登录
    login(request, user)
    # 返回成功信息
    return JsonResponse({
        'result': "success",
    })
