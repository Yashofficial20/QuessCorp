from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import IntegrityError
from .models import Attendance
from .serializers import AttendanceSerializer
from employees.models import Employee


@api_view(['POST'])
def mark_attendance(request):
    """
    Mark attendance for an employee.
    """
    serializer = AttendanceSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response(
                {'error': 'Attendance for this employee on this date already exists.'},
                status=status.HTTP_409_CONFLICT
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_employee_attendance(request, emp_id):
    """
    Get attendance records for a specific employee.
    """
    try:
        employee = Employee.objects.get(pk=emp_id)
        attendance_records = Attendance.objects.filter(employee=employee)
        serializer = AttendanceSerializer(attendance_records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee not found.'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
def get_all_attendance(request):
    """
    Get all attendance records with optional date filtering.
    """
    attendance_records = Attendance.objects.all()
    
    # Optional date filtering
    date_param = request.query_params.get('date', None)
    if date_param:
        attendance_records = attendance_records.filter(date=date_param)
    
    serializer = AttendanceSerializer(attendance_records, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
