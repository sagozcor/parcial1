<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="display-3">Estudiante</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <form>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-text-field
                  label="Nombre"
                  v-model="formEstudiante.nombre"
                  required
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  label="Apellido"
                  v-model="formEstudiante.apellido"
                  required
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  label="Celular"
                  v-model="formEstudiante.celular"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          

          <v-btn
            v-if="btnEditarEstudiante == false"
            class="mr-4"
            color="success"
            @click="AgregarEstudiante()"
          >
            Agregar
          </v-btn>
          <v-btn
            v-if="btnEditarEstudiante == true"
            class="mr-4"
            color="success"
            @click="ModificarEstudiante()"
          >
            Modificar
          </v-btn>
          <v-btn 
            color="gray"
            @click="clearEstudiante()"
          >
            Limpiar
          </v-btn>
        </form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  #
                </th>
                <th class="text-left">
                  Nombre
                </th>
                <th class="text-left">
                  Apellido
                </th>
                <th class="text-left">
                  Celular
                </th>
                <th class="text-left">
                  OPCION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in estudiantes"
                :key="item.id"
              >
                <td>{{ index+1 }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.apellido }}</td>
                <td>{{ item.celular }}</td>
                <td>
                  <v-btn
                    color="warning"
                    outlined
                    @click="formEstudianteUpdate(item)"
                  >
                    editar
                  </v-btn>
                  ||
                  <v-btn
                    color="error"
                    outlined
                    @click="EliminarDocente(item.id)"
                  >
                    eliminar
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="display-3">Notas</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <form>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-select
                  :items="selectMateria"
                  item-text="materia"
                  item-value="id"
                  label="Materias"
                  dense
                  return-object
                  v-model="formNotas.id_materias"
                  @change="changeSelectMateria"
                ></v-select>
              </v-col>

             

              <v-col>
                <v-select
                  :items="selectEstudiante"
                  item-text="nombreEstudiante"
                  item-value="id"
                  label="Estudiantes"
                  dense
                  return-object
                  v-model="formNotas.id_estudiante"
                  @change="changeSelectEstudiante"
                ></v-select>
              </v-col>
            </v-row>
              <v-row>
               <v-col>
                <v-text-field
                  label="nota"
                  v-model="formNotas.nota"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          

        
          <v-btn
            class="mr-4"
            @click="AgregarNotas()"
            v-if="btnEditarNotas == false"
            color="success"
            elevation="3"
          >
            Agregar
          </v-btn>
            
          <v-btn
            v-if="btnEditarNotas == true"
            class="mr-4"
            color="success"
            @click="ModificarNotas()"
          >
            Modificar
          </v-btn>
          <v-btn 
            color="gray"
            @click="clearNota()"
          >
            Limpiar
          </v-btn>
        </form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  #
                </th>
                <th class="text-left">
                  Materia
                </th>
                <th class="text-left">
                  Docente
                </th>
                <th class="text-left">
                  Estudiante
                </th>
                <th class="text-left">
                  nota
                </th>
                <th class="text-left">
                  OPCION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in notas"
                :key="item.id"
              >
                <td>{{ index+1 }}</td>
                <td>{{ item.materia }}</td>
                <td>{{ item.docente }}</td>
                <td>{{ item.estudiante }} </td>
                <td>{{ item.nota }} </td>
                <td>
                  <v-btn
                    color="warning"
                    outlined
                    @click="FormNotaUpdate(item)"
                  >
                    editar
                  </v-btn>
                  ||
                  <v-btn
                    color="error"
                    outlined
                    @click="EliminarNotas(item.id)"
                  >
                    eliminar
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import axios from 'axios';

  export default {
    name: 'Estudiante',
    data(){
      return {
        estudiantes: [],
        materias: [],
        notas:[],
        formEstudiante: {
          id: '',
          nombre: '',
          apellido: '',
          celular: ''
        },
        formNotas: {
          id:'',
          id_estudiante: '',
          id_materias: '',
          nota:'',
          estudiante: '',
          materia: ''
        },
        btnEditarEstudiante: false,
        btnEditarNotas: false,
        selectEstudiante: [],
        selectMateria: []
      }
    },
    methods: {
      
      clearEstudiante(){
        this.formEstudiante.id = '';
        this.formEstudiante.nombre = '';
        this.formEstudiante.apellido = '';
        this.formEstudiante.celular = '';

        this.btnEditarEstudiante = false;
      },
      formEstudianteUpdate(item){
        console.log(item.id)
        this.formEstudiante.id = item.id;
        this.formEstudiante.nombre = item.nombre;
        this.formEstudiante.apellido = item.apellido;
        this.formEstudiante.celular = item.celular;

        this.btnEditarEstudiante = true;
        this.mostrarEstudiante();
        
      },
      AgregarEstudiante(){
        axios.post('http://localhost:3001/api/estudiantes', {
          'nombre': this.formEstudiante.nombre,
          'apellido': this.formEstudiante.apellido,
          'celular': this.formEstudiante.celular,
        }).then(
          res => {
            console.log(res.data)
            this.mostrarEstudiante();
          }
        ).catch(e => console.log(e))
      },

      ModificarEstudiante(){
        axios.put(`http://localhost:3001/api/estudiantes/`+this.formEstudiante.id, {
          'nombre': this.formEstudiante.nombre,
          'apellido': this.formEstudiante.apellido,
          'celular': this.formEstudiante.celular,
        }).then(
          res => {
            console.log(res.data)
            this.mostrarEstudiante();
          }
        ).catch(e => console.log(e))
      },
      EliminarDocente(id){
        axios.delete(`http://localhost:3001/api/estudiantes/`+id).then(
          res => {
            console.log(res.data)
            this.mostrarEstudiante();
          }
        ).catch(e => console.log(e))
      },

      changeSelectEstudiante(val){
        console.log(val)
        this.formNotas.id_estudiante = val.id
        this.formNotas.estudiante = val.nombreEstudiante
      },
      changeSelectMateria(value){
        console.log(value)
        this.formNotas.id_materias = value.id
        this.formNotas.materia = value.materia
      },
      mostrarEstudiante(){
        axios.get('http://localhost:3001/api/estudiantes').then(
          res => {
            //console.log(res.data);
            this.estudiantes = res.data;

            this.estudiantes.forEach(est => {
              console.log(est.nombre);

              //let nombreCompleto = item.nombre + ' ' + item.apellido;

              this.selectEstudiante.push({'id': est.id,'nombreEstudiante' :est.nombre})
            })
          }
        ).catch(e => console.log(e))
      },
      MostrarMaterias(){
        axios.get('http://localhost:3001/api/materias').then(
          res => {
            //console.log(res.data);
            this.materias = res.data;

            this.materias.forEach(mat => {
              console.log(mat.materia)
              this.selectMateria.push({'id': mat.id,'materia' :mat.materia})
            })
          }
        ).catch(e => console.log(e))
      },
      MostrarNotas(){
        axios.get('http://localhost:3001/api/notas').then(
          res => {
            this.notas = res.data;
            console.log(this.notas)
          }
        ).catch(e => console.log(e))
      },
      clearNota(){
        this.formNotas.id = '';
        this.formNotas.id_estudiante = '';
        this.formNotas.id_materias = '';
        this.formNotas.nota = '';
        this.formNotas.estudiante = '';
        this.formNotas.materia = '';

        this.btnEditarNotas = false;
      },
      FormNotaUpdate(item){
        console.log(item.id)
        this.formNotas.id = item.id;
        this.formNotas.id_estudiante = item.id_estudiantes;
        this.formNotas.id_materias = item.id_materias;
        this.formNotas.nota = item.nota;
        this.formNotas.estudiante = item.estudiante;
        this.formNotas.materia = item.materia;

        this.btnEditarNotas = true;
        this.MostrarNotas();
        console.log(this.formEstudiante.id_estudiante)
        
      },
      AgregarNotas(){
        console.log(this.formNotas);
        axios.post('http://localhost:3001/api/notas', {
          'id_materias': this.formNotas.id_materias,
          'nota': this.formNotas.nota,
          'id_estudiantes': this.formNotas.id_estudiante,
        }).then(
          res => {
            console.log(res.data)
            this.clearNota();
            this.MostrarNotas();
          }
        ).catch(e => console.log(e))
      },
      ModificarNotas(){
        axios.put(`http://localhost:3001/api/notas/`+this.formNotas.id, {
          'id_materias': this.formNotas.id_materias,
          'nota': this.formNotas.nota,
          'id_estudiantes': this.formNotas.id_estudiante,
        }).then(
          res => {
            console.log(res.data)
            this.clearNota();
            this.MostrarNotas();
          }
        ).catch(e => console.log(e))
      },
      EliminarNotas(id){
        axios.delete(`http://localhost:3001/api/notas/`+id).then(
          res => {
            console.log(res.data)
            this.MostrarNotas();
          }
        ).catch(e => console.log(e))
      },
    },
    
    
    created(){
      this.mostrarEstudiante();
      this.MostrarMaterias();
      this.MostrarNotas();
    }
  }
</script>
