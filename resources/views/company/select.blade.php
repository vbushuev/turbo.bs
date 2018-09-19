<select class="form-control" name="{{ $name ?? 'company_id' }}">
    @foreach(Auth::user()->companies as $item)
        <option value="{{ $item->id }}"
        @if( isset($value) && $value== $item->id)
        selected="selected"
        @endif
        >
            {{ $item->name }}
        </option>
    @endforeach
</select>
