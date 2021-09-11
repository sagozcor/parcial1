<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="display-3">Docentes</h2>
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
                  v-model="formDocente.nombre"
                  required
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  label="Apellido"
                  v-model="formDocente.apellido"
                  required
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  label="Celular"
                  v-model="formDocente.celular"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          

          <v-btn
            v-if="btnEditarDocente == false"
            class="mr-4"
            color="success"
            @click="AgregarDocente()"
          >
            Agregar
          </v-btn>
          <v-btn
            v-if="btnEditarDocente == true"
            class="mr-4"
            color="success"
            @click="ModificarDocente()"
          >
            Modificar
          </v-btn>
          <v-btn 
            color="gray"
            @click="clearDocente()"
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
                v-for="(item, index) in docentes"
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
                    @click="FormDocenteUpdate(item)"
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
        <h2 class="display-3">Materias</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <form>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-text-field
                  label="Materia"
                  v-model="formMaterias.materia"
                  required
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  label="Credito"
                  v-model="formMaterias.credito"
                  required
                ></v-text-field>
              </v-col>

              <v-col class="mt-4">
                <v-select
                  :items="selectDocente"
                  item-text="nombre"
                  item-value="id"
                  label="Docente"
                  dense
                  return-object
                  v-model="formMaterias.id_docente"
                  @change="changeSelect"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          

          <v-btn
            v-if="btnEditarMaterias == false"
            class="mr-4"
            color="success"
            @click="AgregarMaterias()"
          >
            Agregar
          </v-btn>
          <v-btn
            v-if="btnEditarMaterias == true"
            class="mr-4"
            color="success"
            @click="ModificarMateria()"
          >
            Modificar
          </v-btn>
          <v-btn 
            color="gray"
            @click="clearMateria()"
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
                  Credito
                </th>
                <th class="text-left">
                  Docente
                </th>
                <th class="text-left">
                  OPCION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in materias"
                :key="item.id"
              >
                <td>{{ index+1 }}</td>
                <td>{{ item.materia }}</td>
                <td>{{ item.credito }}</td>
                <td>{{ item.nombre + ' ' + item.apellido }} </td>
                <td>
                  <v-btn
                    color="warning"
                    outlined
                    @click="FormMateriaUpdate(item)"
                  >
                    editar
                  </v-btn>
                  ||
                  <v-btn
                    color="error"
                    outlined
                    @click="EliminarMaterias(item.id)"
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
    name: 'Home',
    data(){
      return {
        docentes: [],
        materias:[],
        formDocente: {
          id: '',
          nombre: '',
          apellido: '',
          celular: ''
        },
        formMaterias: {
          id:'',
          materia: '',
          credito: '',
          id_docente: '',
          nombreDocente: ''
        },
        btnEditarDocente: false,
        btnEditarMaterias: false,
        selectDocente: []
      }
    },
    methods: {
      viewDocentes(){
        axios.get('http://localhost:3001/api/docentes').then(
          res => {
            //console.log(res.data);
            this.docentes = res.data;

            this.docentes.forEach(item => {
              console.log(item.nombre);

              let nombreCompleto = item.nombre + ' ' + item.apellido;

              this.selectDocente.push({'id': item.id,'nombre' :nombreCompleto})
            })
          }
        ).catch(e => console.log(e))
      },
      clearDocente(){
        this.formDocente.id = '';
        this.formDocente.nombre = '';
        this.formDocente.apellido = '';
        this.formDocente.celular = '';

        this.btnEditarDocente = false;
      },
      FormDocenteUpdate(item){
        console.log(item.id)
        this.formDocente.id = item.id;
        this.formDocente.nombre = item.nombre;
        this.formDocente.apellido = item.apellido;
        this.formDocente.celular = item.celular;

        this.btnEditarDocente = true;
        this.viewDocentes();
        
      },
      AgregarDocente(){
        axios.post('http://localhost:3001/api/docentes', {
          'nombre': this.formDocente.nombre,
          'apellido': this.formDocente.apellido,
          'celular': this.formDocente.celular,
        }).then(
          res => {
            console.log(res.data)
            this.viewDocentes();
          }
        ).catch(e => console.log(e))
      },

      ModificarDocente(){
        axios.put(`http://localhost:3001/api/docentes/`+this.formDocente.id, {
          'nombre': this.formDocente.nombre,
          'apellido': this.formDocente.apellido,
          'celular': this.formDocente.celular,
        }).then(
          res => {
            console.log(res.data)
            this.viewDocentes();
          }
        ).catch(e => console.log(e))
      },
      EliminarDocente(id){
        axios.delete(`http://localhost:3001/api/docentes/`+id).then(
          res => {
            console.log(res.data)
            this.viewDocentes();
          }
        ).catch(e => console.log(e))
      },

      changeSelect(val){
        console.log(val.id)
        this.formMaterias.id_docente = val.id
        this.formMaterias.nombreDocente = val.nombre
      },

      MostrarMaterias(){
        axios.get('http://localhost:3001/api/materias').then(
          res => {
            console.log(res.data);
            this.materias = res.data;
          }
        ).catch(e => console.log(e))
      },
      EliminarMaterias(id){
        axios.delete(`http://localhost:3001/api/materias/`+id).then(
          res => {
            console.log(res.data)
            this.MostrarMaterias();
          }
        ).catch(e => console.log(e))
      },
      clearMateria(){
        this.formMaterias.id = '';
        this.formMaterias.materia = '';
        this.formMaterias.credito = '';
        this.formMaterias.id_docente = '';
        this.formMaterias.nombreDocente = '';

        this.btnEditarMaterias = false;
      },
      FormMateriaUpdate(item){
        console.log(item.id)
        this.formMaterias.id = item.id;
        this.formMaterias.materia = item.materia;
        this.formMaterias.credito = item.credito;
        this.formMaterias.id_docente = item.id_docente;
        let nombreDocente = item.nombre + ' ' + item.apellido;
        this.formMaterias.nombreDocente = nombreDocente;

        this.btnEditarMaterias = true;
        this.MostrarMaterias();
        
      },
      AgregarMaterias(){
        axios.post('http://localhost:3001/api/materias', {
          'materia': this.formMaterias.materia,
          'credito': this.formMaterias.credito,
          'id_docente': this.formMaterias.id_docente,
        }).then(
          res => {
            console.log(res.data)
            this.MostrarMaterias();
          }
        ).catch(e => console.log(e))
      },
      ModificarMateria(){
        axios.put(`http://localhost:3001/api/materias/`+this.formMaterias.id, {
          'materia': this.formMaterias.materia,
          'credito': this.formMaterias.credito,
          'id_docente': this.formMaterias.id_docente,
        }).then(
          res => {
            console.log(res.data)
            this.MostrarMaterias();
          }
        ).catch(e => console.log(e))
      },
    },
    
    
    created(){
      this.viewDocentes();
      this.MostrarMaterias();
    }
  }
</script>
