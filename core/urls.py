from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^clients/', views.clients, name='clients'),
    url(r'^client/', views.client, name='client'),
    url(r'^jobs/', views.jobs, name='jobs'),
    url(r'^job/(?P<job_id>[0-9]+)/$', views.job_detail, name='job_detail'),
    url(r'^job/(?P<job_id>[0-9]+)/edit/$', views.job_edit, name='job_edit'),
    url(r'^job/new/$', views.job_new, name='job_new'),
    url(r'^search/', views.search, name='search'),
]
