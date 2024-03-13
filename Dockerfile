# first build frontend layer
## set node19 as the base image
FROM node:19 AS frontend-build
## set /app as the dir for frontend build artifact
WORKDIR /ui
## copy from current local dir to image workdir
COPY frontend/ ./frontend/
## RUN by default run things from root workdir of the image
## go into image workdir for frontend and build frontend artifact via npm
RUN cd frontend && npm i && npm install typescript@4.9.5 -g
## sadly jsx react flag has to be manually added
RUN cd frontend && cp configFiles/tsconfig.json tsconfig.json && npm run build

# then build the whole app (frontend + backend)
FROM node:19 AS app-build
WORKDIR /app
## copy the frontend built artifact to current workdir (this is for the whole app)
COPY --from=frontend-build /ui/frontend/build ./frontend/build
COPY backend/package*.json ./backend/
RUN apt-get update || : && apt-get install python3 -y \
    python3-pip
RUN python3 -m pip install wheel
RUN python3 -m pip install pandas
RUN python3 -m pip install --upgrade google-cloud-storage
RUN cd backend && npm install
ENV PYTHON_CODE_PATH /app/backend/pythonScripts
ENV RESOURCE_FILE_PATH /app/backend/resources
COPY backend/ ./backend/

EXPOSE 3001

CMD ["node", "./backend/app.js"]