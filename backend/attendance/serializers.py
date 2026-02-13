from rest_framework import serializers
from .models import Attendance
from employees.models import Employee


class AttendanceSerializer(serializers.ModelSerializer):
    """
    Serializer for Attendance model.
    """
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    employee_id_display = serializers.CharField(source='employee.employee_id', read_only=True)
    
    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_name', 'employee_id_display', 'date', 'status', 'created_at']
        read_only_fields = ['id', 'created_at', 'employee_name', 'employee_id_display']

    def validate_employee(self, value):
        """
        Ensure employee exists.
        """
        if not Employee.objects.filter(pk=value.pk).exists():
            raise serializers.ValidationError("Employee does not exist.")
        return value

    def validate_status(self, value):
        """
        Ensure status is valid.
        """
        valid_statuses = ['PRESENT', 'ABSENT']
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(valid_statuses)}")
        return value

    def validate(self, data):
        """
        Check for duplicate attendance.
        """
        employee = data.get('employee')
        date = data.get('date')
        
        # For create operation (no instance yet)
        if not self.instance:
            if Attendance.objects.filter(employee=employee, date=date).exists():
                raise serializers.ValidationError(
                    "Attendance for this employee on this date already exists."
                )
        
        return data
