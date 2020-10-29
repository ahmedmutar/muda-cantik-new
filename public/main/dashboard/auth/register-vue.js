// Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

const registerApp = new Vue({
	el: '#register-app',
	data: {
    form: {
      username: '',
      firstname: '',
      lastname: '',
      dob: '',
      email: '',
      password: '',
      phone: '',
      image: '',
    },
    message: '',
    showAlert: false,
    isSuccess: false,
    baseUrl: ''
  },
  mounted() {
    $(".txt-datepicker").datepicker({
      format: 'yyyy-mm-dd',
      container:'.container-datepicker',
      autoclose: true,
      todayHighlight: true,
    }).on('changeDate', () => {
      this.form.dob = $('.txt-datepicker').val();
    });
  },
	methods: {
    onFileChange: function(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      this.form.image = files;
    },
		onSubmit: function() {
      const formData = {
        'username': this.form.username,
        'firstname': this.form.firstname,
        'lastname': this.form.lastname,
        'birthdate': this.form.dob,
        'email': this.form.email,
        'password': this.form.password,
        'phonenumber': this.form.phone,
        'imageprofile': '',
        'role': 'admin',
        'status': 'active'
      }

      axios.post(this.$refs.baseUrl.value + '/api/admin/auth/signup', formData, { headers: { "Content-Type": "application/json" } })
      .then(resp => {
        this.showAlert = true; this.isSuccess = true;
        this.message = 'Register Success';
      })
      .catch(err => {
        err.response.data.errors.forEach((element, idx) => {
          const msg = (idx !== 0 ) ? element + '<br>' : element;
          this.message += msg;
        });

        this.showAlert = true; this.isSuccess = false;
      })
      .finally(() => {
        setTimeout(() => {
          this.showAlert = false;
          if (this.isSuccess) { location.href = this.$refs.baseUrl.value + '/admin/login'; }
        }, 2000);
      });
		}
	},
});
