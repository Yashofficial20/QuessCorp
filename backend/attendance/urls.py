from django.urls import path
from . import views

urlpatterns = [
    path('', views.mark_attendance, name='mark-attendance'),
    path('all/', views.get_all_attendance, name='get-all-attendance'),
    path('<int:emp_id>/', views.get_employee_attendance, name='get-employee-attendance'),
]
