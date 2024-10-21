import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    student_sap_no: String,
    student_roll_no: String,
    campus: String,
    program: String,
    engineering_specialization: String,
    first_name: String,
    middle_name: String,
    last_name: String,
    name_of_student: String,
    fathers_name: String,
    mothers_name: String,
    date_of_birth: Date,
    gender: String,
    local_address: String,
    local_address_city: String,
    local_address_state: String,
    permanent_address: String,
    permanent_address_postal_code: String,
    home_town: String,
    permanent_address_city: String,
    permanent_address_state: String,
    permanent_address_country: String,
    student_mobile_no: String,
    alternate_student_mobile_no: String,
    fathers_mobile_no: String,
    mothers_mobile_no: String,
    home_landline_no: String,
    home_mobile_no: String,
    student_email_id: String,
    student_alternate_email_id: String,
    fathers_email_id: String,
    mothers_email_id: String,
    has_pan_card: String,
    pan_card_no: String,
    aadhar_card_no: String,
    has_passport: String,
    passport_no: String,
    passport_expiry_date: Date,

    //
    tenth_standard_percentage: Number,
    year_of_passing_tenth: Number,
    board_of_passing_tenth: String,
    tenth_school: String,

    tenth_passing_state: String,
    tenth_passing_country: String,
    tenth_marksheet: {
      type: String,
      default: "",
    },

    //
    twelfth_standard_percentage: Number,
    year_of_passing_twelfth: Number,
    board_of_passing_twelfth: String,
    twelfth_school: String,
    twelfth_school_city: String,
    twelfth_passing_state: String,
    twelfth_passing_country: String,
    twelfth_marksheet: {
      type: String,
      default: "",
    },

    //
    diploma_stream: String,
    diploma_passing_state: String,
    diploma_passing_country: String,
    diploma_college: String,
    diploma_board_of_passing: String,
    diploma_year_of_passing: Number,
    diploma_marksheet: {
      type: String,
      default: "",
    },

    //
    first_year_first_semester_percentage_diploma: Number,
    first_year_second_semester_percentage_diploma: Number,
    first_year_percentage_diploma: Number,
    second_year_third_semester_percentage_diploma: Number,
    second_year_fourth_semester_percentage_diploma: Number,
    second_year_percentage_diploma: Number,
    third_year_fifth_semester_percentage_diploma: Number,
    third_year_sixth_semester_percentage_diploma: Number,
    third_year_percentage_diploma: Number,
    fourth_year_seventh_semester_percentage_diploma: Number,
    fourth_year_eighth_semester_percentage_diploma: Number,
    fourth_year_percentage_diploma: Number,
    final_percentage_diploma: Number,
    aggregate_percentage_diploma: Number,
    year_of_passing_diploma: Number,

    //
    gpa_first_semester_first_year: Number,
    cgpa_first_semester_first_year: Number,
    academic_year_clearing_sem1: Number,
    gpa_second_semester_first_year: Number,
    cgpa_second_semester_first_year: Number,
    academic_year_clearing_sem2: Number,
    gpa_third_semester_second_year: Number,
    cgpa_third_semester_second_year: Number,
    academic_year_clearing_sem3: Number,
    gpa_fourth_semester_second_year: Number,
    cgpa_fourth_semester_second_year: Number,
    academic_year_clearing_sem4: Number,
    gpa_fifth_semester_third_year: Number,
    cgpa_fifth_semester_third_year: Number,
    academic_year_clearing_sem5: Number,
    gpa_sixth_semester_third_year: Number,
    cgpa_sixth_semester_third_year: Number,
    academic_year_clearing_sem6: Number,

    //
    total_dead_kts: Number,
    total_live_kts: Number,
    last_received_marksheet: String,
    has_year_drop_or_gap: String,
    year_drop_between_tenth_and_beginning_of_engineering: String,
    years_of_gap: Number,
    reason_for_gap_or_drop_before_engineering: String,
    year_drop_between_engineering: String,
    years_of_gap_during_engineering: Number,
    reason_for_gap_or_drop_during_engineering: String,

    //
    cv_uploaded_in_nmims_format: String,
    documents_uploaded: String,

    // skills
    skills: {
      type: [String],
      default: [],
    },
    //
    student_cv: {
      type: String,
      default: "",
    },
    student_profile_image: {
      type: String,
      default: "",
    },

    student_marksheet_sem_1: {
      type: String,
      default: "",
    },
    student_marksheet_sem_2: {
      type: String,
      default: "",
    },
    student_marksheet_sem_3: {
      type: String,
      default: "",
    },
    student_marksheet_sem_4: {
      type: String,
      default: "",
    },
    student_marksheet_sem_5: {
      type: String,
      default: "",
    },
    student_marksheet_sem_6: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;



