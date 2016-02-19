from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^clients/', views.clients, name='clients'),
    url(r'^client/', views.client, name='client'),
    url(r'^jobs/', views.jobs, name='jobs'),
    url(r'^job/', views.job, name='job'),
    url(r'^search/', views.search, name='search'),
]
