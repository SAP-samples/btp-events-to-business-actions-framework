from aws_cdk import ( 
    aws_lambda as _lambda,
    App,
    Stack,
    Duration
)
# from aws_cdk.aws_lambda_python import(
#     PythonLayerVersion
# )
import os
from   os import path
import subprocess
from constructs import Construct

class LambdaLayers(Construct):

    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        #aws_lambda_python PythonLayerVersion requires docker 
        # self._pyodataLayer = PythonLayerVersion(
        #        self, 'pyOData',
        #        entry='LambdaLayer/pyodata',
        #        compatible_runtimes=[_lambda.Runtime.PYTHON_3_7],
        #        description='Layer for pyodata Library',
        #        layer_version_name='1.0'
        #    )

        __dirname = (os.path.dirname(__file__))

        requirements_file = path.join( __dirname,'requirements.txt')
        output_dir = path.join( __dirname,'./build/layers')

        if not os.environ.get('SKIP_PIP'):
            subprocess.check_call(
                f'pip install -r {requirements_file} -t {output_dir}/python'.split()
            )

            self._lambdalayer = _lambda.LayerVersion(
                self, 'appDependecies',
                code=_lambda.Code.from_asset(output_dir),
                compatible_runtimes=[_lambda.Runtime.PYTHON_3_7,_lambda.Runtime.PYTHON_3_8],
                description='Lambda Dependencies'
            )
        # self._pyodataLayer = _lambda.LayerVersion(
        #     self, 'pyodata',
        #     code=_lambda.Code.from_asset(path.join( __dirname,'./pyodata')),
        #     compatible_runtimes=[_lambda.Runtime.PYTHON_3_7,_lambda.Runtime.PYTHON_3_8],
        #     description='pyodata layer for Lambda'
        # )


        # self._boto3 = _lambda.LayerVersion(
        #     self, 'boto3',
        #     code=_lambda.Code.from_asset(path.join( __dirname,'./boto3')),
        #     compatible_runtimes=[_lambda.Runtime.PYTHON_3_7,_lambda.Runtime.PYTHON_3_8],
        #     description='aws boto3 client for Lambda'
        # )

        # self._pillow = _lambda.LayerVersion(
        #     self, 'pillow',
        #     code=_lambda.Code.from_asset(path.join( __dirname,'./pillow')),
        #     compatible_runtimes=[_lambda.Runtime.PYTHON_3_7,_lambda.Runtime.PYTHON_3_8],
        #     description='python Image library for Lambda'
        # )

        # self._requests = _lambda.LayerVersion(
        #     self, 'requests',
        #     code=_lambda.Code.from_asset(path.join( __dirname,'./requests')),
        #     compatible_runtimes=[_lambda.Runtime.PYTHON_3_7,_lambda.Runtime.PYTHON_3_8],
        #     description='python requests library for Lambda'
        # )

