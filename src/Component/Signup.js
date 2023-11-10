import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
    employees: Yup.array().of(
        Yup.object().shape({
            firstName: Yup.string().required('Mnadnetory'),
            lastName: Yup.string().required('Mnadnetory'),
            country: Yup.string().required('Mnadnetory').notOneOf(['0'],'select'),
            state: Yup.string().required('Mnadnetory').notOneOf(['0'],'select'),
        })
    )
})
function Signup(props) {
    const formik = useFormik({
        initialValues: {
            employees: [{ firstName: '', lastName: '', country: '0', state:' 0 '}],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });
    const country = [{ id: 1, name: 'India', state: [{ id: 1, name: 'mh' }, { id: 2, name: 'pu' }, { id: 3, name: 'ng' }] }, { id: 2, name: 'Srilanka', state: [{ id: 1, name: 'sl1' }, { id: 2, name: 'sl2' }, { id: 3, name: 'sl3' }] }, { id: 3, name: 'ras', state: [{ id: 1, name: 'ras' }, { id: 2, name: 'ras2' }, { id: 3, name: 'ras3' }] }];
    const [stateArray, setStateArray] = useState([]);
    const getCountry = (e, j) => {
        formik.handleChange(e);
        let a = [...stateArray];
        for (let i = 0; i < country.length; i++) {
            if ((country[i].id).toString() === (e.target.value).toString()) {
                a[j] = country[i].state;
                break;
            }
        }
        setStateArray(a);
        formik.setFieldValue(`employees[${j}].state`, 0)
    }
    useEffect(() => {

    }, [])

    return (

        <div>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="table-responsive">
                        <FieldArray name='employees' render={(arrayHelper) => (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>sr.no</th>
                                        <th>firtsname</th>
                                        <th>lastname</th>
                                        <th>country</th>
                                        <th>state</th>
                                        <th>action <button className='btn btn-primary' type="button"
                                            onClick={() => arrayHelper.push({ firstName: "", lastName: "",country:'0',state:'0'})}>add</button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formik.values.employees && formik.values.employees.length > 0 && formik.values.employees.map((emp, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <input type="text" name={`employees[${i}].firstName`} value={formik.values.employees[i]?.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
                                                {(formik.touched.employees && formik.touched.employees[i]?.firstName && formik.errors.employees && formik.errors.employees[i]?.firstName) && <p className='text-danger'>{formik.errors.employees[i]?.firstName}</p>}
                                            </td>
                                            <td>
                                                <input type="text" name={`employees[${i}].lastName`} value={formik.values.employees[i]?.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
                                                {(formik.touched.employees && formik.touched.employees[i]?.lastName && formik.errors.employees && formik.errors.employees[i]?.lastName) && <p className='text-danger'>{formik.errors.employees[i]?.lastName}</p>}
                                            </td>
                                            <td>
                                                <select name={`employees[${i}].country`} className='form-select' id="" value={formik.values.employees[i].country} onChange={(e) => { getCountry(e, i) }}>
                                                    <option value="0">select country</option>
                                                    {
                                                        country.map((item, i) => (
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                            ))
                                                        }
                                                </select>
                                                        {(formik.touched.employees && formik.touched.employees[i]?.country && formik.errors.employees && formik.errors.employees[i]?.country) && <p className='text-danger'>{formik.errors.employees[i]?.country}</p>}
                                            </td>
                                            <td>
                                                <select name={`employees[${i}].state`} className='form-select' id="" value={formik.values.employees[i]?.state} onChange={formik.handleChange}>
                                                    <option value="0">select state</option>
                                                    {
                                                        stateArray[i] && stateArray[i].length > 0 && stateArray[i].map((item, i) => (
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                            ))
                                                        }
                                                </select>
                                                        {(formik.touched.employees && formik.touched.employees[i]?.state && formik.errors.employees && formik.errors.employees[i]?.state) && <p className='text-danger'>{formik.errors.employees[i]?.state}</p>}
                                            </td>
                                            <td>
                                                <button className='btn btn-primary' type="button"
                                                    onClick={() => arrayHelper.remove(i)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        )}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>subit</button>
                </form>
            </FormikProvider>
        </div>
    );
}

export default Signup;