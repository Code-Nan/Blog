from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('register/exist', views.register_exist, name='register_exist'),
    path('register/handle', views.register_handle, name='register_handle'),
    path('login/handle', views.login_handle, name='login_handle'),
]
