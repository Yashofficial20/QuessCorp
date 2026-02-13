from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    """
    Serializer for Employee model with validation.
    """
    
    class Meta:
        model = Employee
        fields = ['id', 'employee_id', 'full_name', 'email', 'department', 'created_at']
        read_only_fields = ['id', 'employee_id', 'created_at']

    def validate_full_name(self, value):
        """
        Ensure full_name is not empty.
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Full name cannot be empty.")
        return value.strip()

    def validate_email(self, value):
        """
        Ensure email is valid format.
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Email cannot be empty.")
        return value.strip().lower()

    def validate_department(self, value):
        """
        Ensure department is not empty.
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Department cannot be empty.")
        return value.strip()
