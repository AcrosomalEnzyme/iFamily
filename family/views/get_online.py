import datetime
from time import sleep

from django.http import JsonResponse
# 验证用户登录
from django.contrib.auth import authenticate, login
from family.models.member.member import Member
from django.utils.timezone import now, localtime
from django.utils.datetime_safe import datetime
import time
import datetime


def get_online(request):
    user = request.user
    member = Member.objects.filter(user=user).first()
    member.save()

    # time.sleep(5)
    # different = localtime(now()) - localtime(member.last_active_time)
    #
    # target = datetime.timedelta(seconds=5)
    #
    # print()
    # print(localtime(now()) - localtime(member.last_active_time))
    # print(target > different)
    # print()
    return JsonResponse({
        'result': "success"
    })
