# coding=utf-8
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from user.models import User
from django.contrib.auth.hashers import make_password, check_password
import datetime


# 登录
def login(request):
    context = {
        'title': '用户登录'
    }
    return render(request, 'user/login.html', context)


# 登录处理
def login_handle(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    users = User.objects.filter(name=username)
    if len(users) == 1:
        cipher = users[0].password
        if check_password(password, cipher):
            # 登录成功后设置url、cookie、session等
            blog_url = request.COOKIES.get('blog_url', '/')
            red = HttpResponseRedirect(blog_url)
            red.set_cookie('username', username)
            request.session['username'] = username
            return red
        else:
            context = {
                'title': '用户登录',
                'password_message': '密码错误'
            }
            return render(request, 'user/login.html', context)
    else:
        context = {
            'title': '用户登录',
            'user_message': '用户名错误'
        }
        return render(request, 'user/login.html', context)


# 注册
def register(request):
    context = {
        'title': '用户注册'
    }
    return render(request, 'user/register.html', context)


# 注册用户是否存在
def register_exist(request):
    username = request.POST.get('username', '')
    count = User.objects.filter(name=username).count()
    return JsonResponse({'count': count})


# 注册处理
def register_handle(request):
    username = request.POST.get('username')
    email = request.POST.get('email')
    password = request.POST.get('password')
    cipher = make_password(password, None, 'pbkdf2_sha256')
    date = datetime.datetime.now().strftime('%Y-%m-%d %H:%I:%S')
    user = User(name=username, password=cipher, email=email, date=date)
    user.save()
    return redirect('/user/login/')
