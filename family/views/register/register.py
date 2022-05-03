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
    # username.encode('utf-8')
    password = request.POST.get("password", "").strip()
    password_confirm = request.POST.get("password_confirm", "").strip()
    photo = request.FILES.get("photo")

    # 返回错误
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

    # test
    # file_name = "media/txt/member_stock/" + username + ".txt"
    # 一定要进行转码

    username_ascii=str(username).encode('unicode_escape').decode('ascii')
    new_username = ""

    for i in username_ascii:
        if i != '\\':
            new_username = new_username + i
        else:
            new_username = new_username + "-"

    file_name = "media/txt/member_stock/" + new_username + ".txt"

    file = open(file_name, "w")
    file.close()
    file_name = "txt/member_stock/" + new_username + ".txt"
    # file_name_ascii = "txt/member_stock/" + username + ".txt"
    # file_name = file_name_ascii.encode('utf-8')

    if not photo:
        # 在member表创建用户
        Member.objects.create(user=user, stock_code=file_name)
        # 在player表创建用户
        Player.objects.create(user=user, photo="http://175.178.119.52/media/image/member_photo/default_photo.png")
    else:
        # 求出文件名后缀，与用户名称拼接
        # last_name = str(photo.name).split('.')[-1]
        # last_name = "." + last_name
        #
        # photo_file_name = str(username) + last_name
        # photo.name = photo_file_name

        Member.objects.create(user=user, stock_code=file_name, photo=photo)
        Player.objects.create(user=user, photo="http://175.178.119.52/media/image/member_photo/" + str(photo.name))

    # 创建完直接登录
    login(request, user)
    # 返回成功信息
    return JsonResponse({
        'result': "success",
    })
