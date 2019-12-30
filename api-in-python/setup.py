from setuptools import setup, find_packages

with open('README.rst') as f:
    readme = f.read()

with open('LICENSE') as f:
    license = f.read()

setup(
    name='api-in-python',
    version='0.1.0',
    description='Sample api make in Python',
    long_description=readme,
    author='Demétrius Rodrigues',
    author_email='demetriushrodrigues@gmail.com',
    url='https://github.com/DemetriusHR/python-api-study/tree/master/api-in-python',
    license=license,
    packages=find_packages(exclude=('tests', 'docs'))
)

